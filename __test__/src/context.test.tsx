import RequestModel from "@/data/models/request_model";
import { options } from "@/data/data/methods";
import { ParameterRow } from "@/data/models/parameter";
import { getRequest } from "@/utils/helpers/request_extension";

describe("Validación de la clase RequestModel", () => {
  test("Enlace válido con URL completa", () => {
    const validURL = "https://www.example.com/path?param1=value1&param2=value2";
    const request = new RequestModel(0, validURL);
    expect(request.esEnlaceValido()).toBe(true);
  });

  test("Enlace válido con URL sin parámetros", () => {
    const validURL = "https://www.example.com/path";
    const request = new RequestModel(0, validURL);
    expect(request.esEnlaceValido()).toBe(true);
  });

  test("Enlace inválido sin URL", () => {
    const request = new RequestModel();
    expect(request.esEnlaceValido()).toBe(false);
  });

  test("Enlace inválido con URL mal formada", () => {
    const invalidURL = "www.example.com/path?param=value";
    const request = new RequestModel(0, invalidURL);
    expect(request.esEnlaceValido()).toBe(false);
  });

  test("Enlace válido con método personalizado", () => {
    const customMethod = options[1];
    const validURL = "https://www.example.com/path";
    const request = new RequestModel(customMethod.id, validURL);
    request.method = customMethod;
    expect(request.esEnlaceValido()).toBe(true);
  });
});

describe("Pruebas para el método toQuery de la clase RequestModel", () => {
  test("Con parámetros válidos", () => {
    const parameters: ParameterRow[] = [
      { id: 1, estado: true, key: "param1", value: "value1" },
      { id: 2, estado: true, key: "param2", value: "value2" },
    ];
    const request = new RequestModel(
      0,
      "https://www.example.com",
      "",
      parameters
    );
    const result = request.toQuery(parameters);
    expect(result).toBe("?param1=value1&param2=value2");
  });

  test("Sin parámetros", () => {
    const parameters: ParameterRow[] = [];
    const request = new RequestModel(
      0,
      "https://www.example.com",
      "",
      parameters
    );
    const result = request.toQuery(parameters);
    expect(result).toBe("");
  });

  test("Con parámetros vacíos", () => {
    const parameters: ParameterRow[] = [
      { id: 1, estado: true, key: "", value: "" },
      { id: 2, estado: true, key: "", value: "" },
    ];
    const request = new RequestModel(
      0,
      "https://www.example.com",
      "",
      parameters
    );
    const result = request.toQuery(parameters);
    expect(result).toBe("");
  });
});

describe("Pruebas para el método getRequest", () => {
  test("Con una URL válida con parámetros", () => {
    const url = "https://www.example.com/path?param1=value1&param2=value2";
    const method = 1; // Asigna un método válido según tus opciones

    const result = getRequest(url, method);

    // Verifica que se cree una instancia de RequestModel correctamente
    expect(result).toBeDefined();
    expect(result?.url).toBe("https://www.example.com/path?param1=value1&param2=value2");
    expect(result?.query_params).toBe("?param1=value1&param2=value2");
  });

  test("Con una URL válida sin parámetros", () => {
    const url = "https://www.example.com/path";
    const method = 2; // Asigna un método válido según tus opciones

    const result = getRequest(url, method);

    // Verifica que se cree una instancia de RequestModel correctamente
    expect(result).toBeDefined();
    expect(result?.url).toBe("https://www.example.com/path");
    expect(result?.query_params).toBe("");
  });

  test("Con una URL inválida", () => {
    const url = "www.example.com/path?param=value";
    const result = getRequest(url);
    expect(result).toBeUndefined();
  });
});


