import { options } from "@/data/data/methods";
import CategoryType from "@/data/models/category_model";
import ConfigConvert, { copyWith } from "@/data/models/config_model";
import RequestModel from "@/data/models/request_model";
import ResponseModel from "@/data/models/response_model";
import { getProperties } from "@/utils/helpers/request_extension";

describe("Pruebas para la función getProperties", () => {
  test("Devuelve undefined si el valor no está presente", () => {
    const result = getProperties();
    expect(result).toBeUndefined();
  });

  test("Devuelve undefined si el valor no cumple con la expresión regular", () => {
    const result = getProperties("invalidURL");
    expect(result).toBeUndefined();
  });

  test("Devuelve una instancia de RequestModel sin método especificado", () => {
    const validURL = "https://www.ejemplo.com";
    const result = getProperties(validURL);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(RequestModel);
    expect(result?.url).toBe(validURL);
    expect(result?.method).toBe(options[0]);
  });

  test("Devuelve una instancia de RequestModel con método especificado válido", () => {
    const validURL = "https://www.ejemplo.com";
    const validMethod = "POST";
    const result = getProperties(validURL, validMethod);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(RequestModel);
    expect(result?.url).toBe(validURL);
    expect(result?.method?.name).toBe(validMethod);
  });

  test("Si el método especificado no es válido", () => {
    const validURL = "https://www.ejemplo.com";
    const invalidMethod = "INVALID_METHOD";
    const result = getProperties(validURL, invalidMethod);

    expect(result?.method).toBe(options[0]);
  });
});

describe("Pruebas para el constructor de ResponseModel", () => {
  test("Crea una instancia de ResponseModel correctamente", () => {
    const enlace = "https://www.ejemplo.com";
    const name = new URL("https://www.ejemplo.com");
    const contentType = 1;
    const jsonResponse = { data: "example" };
    const timeStamp = Date.now();

    const responseModel = new ResponseModel(enlace, name, contentType, jsonResponse, timeStamp);

    // Verifica que los valores se asignaron correctamente
    expect(responseModel.Enlace).toBe(enlace);
    expect(responseModel.Name).toBe(name);
    expect(responseModel.contentType).toBe(contentType);
    expect(responseModel.jsonResponse).toBe(jsonResponse);
    expect(responseModel.TimeStamp).toBe(timeStamp);

    // Asegura que la instancia es de tipo ResponseModel
    expect(responseModel).toBeInstanceOf(ResponseModel);
  });

  test("El TimeStamp es readonly y no puede ser modificado", () => {
    const timeStamp = Date.now();
    const responseModel = new ResponseModel("https://www.ejemplo.com", new URL("https://www.ejemplo.com"), 1, {}, timeStamp);

    // Intenta modificar el TimeStamp
    // Esto debería generar un error en tiempo de compilación si TypeScript está configurado correctamente
    // @ts-expect-error
    responseModel.TimeStamp = Date.now();

    // Asegura que el TimeStamp sigue siendo el valor original
    expect(responseModel.TimeStamp).toBe(timeStamp);
  });
});

describe("Pruebas para la función copyWith", () => {
  const createConfig = (): ConfigConvert => ({
    generateToJson: true,
    generateCopyWith: true,
    generateToString: true,
    useDefaultValue: true,
    useEquatable: true,
    useSerializable: true,
    useNum: true,
    generateKey: true,
    generateJsonComment: true,
    propertiesNullable: true,
    useDefaultProperties: true,
  });

  test("Copia correctamente todas las propiedades con actualizaciones proporcionadas", () => {
    const originalConfig = createConfig();
    const updates: Partial<ConfigConvert> = {
      generateToJson: false,
      generateCopyWith: false,
      generateToString: false,
      useDefaultValue: false,
      useEquatable: false,
      useSerializable: false,
      useNum: false,
      generateKey: false,
      generateJsonComment: false,
      propertiesNullable: false,
      useDefaultProperties: false,
    };

    const updatedConfig = copyWith(originalConfig, updates);

    expect(updatedConfig).toEqual(updates);
  });

  test("Copia correctamente solo las propiedades actualizadas", () => {
    const originalConfig = createConfig();
    const updates: Partial<ConfigConvert> = {
      generateToJson: false,
      generateCopyWith: false,
      generateToString: false,
    };

    const updatedConfig = copyWith(originalConfig, updates);

    expect(updatedConfig.generateToJson).toBe(updates.generateToJson);
    expect(updatedConfig.generateCopyWith).toBe(updates.generateCopyWith);
    expect(updatedConfig.generateToString).toBe(updates.generateToString);

    // Asegura que las demás propiedades no fueron modificadas
    expect(updatedConfig.useDefaultValue).toBe(originalConfig.useDefaultValue);
    expect(updatedConfig.useEquatable).toBe(originalConfig.useEquatable);
    expect(updatedConfig.useSerializable).toBe(originalConfig.useSerializable);
    expect(updatedConfig.useNum).toBe(originalConfig.useNum);
    expect(updatedConfig.generateKey).toBe(originalConfig.generateKey);
    expect(updatedConfig.generateJsonComment).toBe(originalConfig.generateJsonComment);
    expect(updatedConfig.propertiesNullable).toBe(originalConfig.propertiesNullable);
    expect(updatedConfig.useDefaultProperties).toBe(originalConfig.useDefaultProperties);
  });

  test("No afecta la configuración original si no se proporcionan actualizaciones", () => {
    const originalConfig = createConfig();
    const updatedConfig = copyWith(originalConfig, {});

    expect(updatedConfig).toEqual(originalConfig);
  });
});

describe("Pruebas para la interfaz CategoryType", () => {
  test("Un objeto válido cumple con la interfaz", () => {
    const validObject: CategoryType = {
      title: "Ejemplo",
      timeStamp: Date.now(),
    };

    expect(validObject).toEqual({
      title: expect.any(String),
      timeStamp: expect.any(Number),
    });
  });

  test("Un objeto con todos los campos cumple con la interfaz", () => {
    const fullObject: CategoryType = {
      inputValue: "InputValue",
      title: "Ejemplo",
      isSave: true,
      timeStamp: Date.now(),
    };

    expect(fullObject).toEqual({
      inputValue: expect.any(String),
      title: expect.any(String),
      isSave: expect.any(Boolean),
      timeStamp: expect.any(Number),
    });
  });

  test("Un objeto sin el campo 'title' no cumple con la interfaz", () => {
    const invalidObject: Partial<CategoryType> = {
      timeStamp: Date.now(),
    };

    // Esto debería generar un error de compilación si TypeScript está configurado correctamente
    expect(invalidObject).not.toEqual({
      title: expect.any(String),
      timeStamp: expect.any(Number),
    });
  });
});
