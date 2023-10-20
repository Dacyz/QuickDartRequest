"use client";
import { generateRandomId } from "@/data/helpers/number_extension";
import { ParameterRow } from "@/data/models/parameter";
import RequestModel from "@/data/models/request_model";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface DashboardContextProps {
  children: ReactNode;
}

interface CategoryType {
  inputValue?: string;
  title: string;
  isSave?: boolean;
  timeStamp: number;
}

interface DashboardContextData {
  localData: RequestModel[];
  categoriesData: CategoryType[];
  requestModel: RequestModel;
  setRequestModel: React.Dispatch<React.SetStateAction<RequestModel>>;
  updateLocalStorage: (data: RequestModel) => void;
  removeLocalStorage: (data: number) => void;
  setRequestName: (newName: string) => void;
  saveRequestModel: () => void;
  setRequestCategory: (newName: string | undefined) => void;
  updateCategoriesStorage: (newData: CategoryType) => void;
  removeCategoriesStorage: (newData: number) => void;
}

const DashboardContext = createContext<DashboardContextData | undefined>(
  undefined
);

const separator: string = ":";
const listRequest: string = "ListRequest";
const listCategories: string = "ListCategories";
const allowedMethods: string[] = ["get", "post", "put", "delete"];

export const DashboardProvider: React.FC<DashboardContextProps> = ({
  children,
}) => {
  const [localData, setLocalData] = useState<RequestModel[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);
  const [requestModel, setRequestModel] = useState<RequestModel>(
    new RequestModel()
  );

  const updateRequestStorage = (newData: RequestModel) => {
    const updatedData = [...localData, newData];
    localStorage.setItem(listRequest, JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  const updateCategoriesStorage = (newData: CategoryType) => {
    const updatedData = [...categoriesData, newData];
    localStorage.setItem(listCategories, JSON.stringify(updatedData));
    setCategoriesData(updatedData);
  };

  // Función para remover datos del localStorage
  const removeLocalStorage = (newData: number) => {
    const updatedData = localData.filter(
      (objeto) => objeto.timeStamp !== newData
    );
    localStorage.setItem(listRequest, JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  const removeCategoriesStorage = (newData: number) => {
    const updatedData = categoriesData.filter(
      (objeto) => objeto.timeStamp !== newData
    );
    localStorage.setItem(listCategories, JSON.stringify(updatedData));
    setCategoriesData(updatedData);
  };

  // Función para establecer el nombre del request
  const setRequestName = (newName: string) => {
    const updatedRequest = requestModel.copyWith({ name: newName });
    setRequestModel(updatedRequest);
  };

  const setRequestCategory = (newName: string | undefined) => {
    const updatedRequest = requestModel.copyWith({ group: newName });
    setRequestModel(updatedRequest);
  };

  // Función para guardar una nueva petición
  // TODO: VALIDAR MODELOS ANTERIORES
  const saveRequestModel = () => {
    try {
      const newModel = requestModel.copyWith({ timeStamp: Date.now() });
      updateRequestStorage(newModel); // Actualiza el localStorage con los datos obtenidos
    } catch (error) {
      console.error("Error al guardar la petición", error);
    }
  };

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const storedDataString = localStorage.getItem(listRequest) || "";
    const storedCategoriesString = localStorage.getItem(listCategories) || "";
    let storedData = [];
    let storedCategoriesData = [];
    let model: RequestModel = new RequestModel();
    try {
      storedData = JSON.parse(storedDataString) || [];
    } catch (error) {
      console.error("Error al analizar los datos de localStorage:", error);
      // Puedes proporcionar un valor predeterminado en caso de un error de análisis.
      storedData = []; // O cualquier otro valor predeterminado que desees.
    }
    try {
      storedCategoriesData = JSON.parse(storedCategoriesString) || [];
    } catch (error) {
      console.error("Error al analizar los datos de localStorage:", error);
      // Puedes proporcionar un valor predeterminado en caso de un error de análisis.
      storedCategoriesData = []; // O cualquier otro valor predeterminado que desees.
    }
    if (hasProperties()) {
      try {
        const newRequestModel = getProperties();
        if (typeof newRequestModel !== "undefined") model = newRequestModel;
      } catch (error) {
        console.error("Error al traer los datos del url:", error);
      }
    }
    console.log(`List: [${storedData.length}], Response: ${model}`);
    setLocalData(storedData);
    setRequestModel(model);
    setCategoriesData(storedCategoriesData);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        localData: localData,
        categoriesData: categoriesData,
        requestModel: requestModel,
        updateLocalStorage: updateRequestStorage,
        removeLocalStorage: removeLocalStorage,
        setRequestModel: setRequestModel,
        setRequestName: setRequestName,
        saveRequestModel: saveRequestModel,
        setRequestCategory: setRequestCategory,
        updateCategoriesStorage: updateCategoriesStorage,
        removeCategoriesStorage: removeCategoriesStorage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext debe utilizarse dentro de un DashboardProvider"
    );
  }
  return context;
};

function hasProperties(): boolean {
  const origin = window.location.origin;
  const fullURL = window.location.href;
  return fullURL.length - origin.length > 3;
}

function getProperties(): RequestModel | undefined {
  const origin = window.location.origin;
  const fullURL = window.location.href;
  const value = fullURL
    .substring(origin.length + 1)
    .replaceAll("http:/", "http://")
    .replaceAll("https:/", "https://");
  console.log(fullURL.length - origin.length);
  console.log(value);
  const parts = value.split(separator);
  // Verificar si la URL cumple con el formato esperado y si el método está en el conjunto permitido
  if (parts.length >= 2) {
    const method = parts[0].toLowerCase(); // Convertir a minúsculas
    const endpoint = value.substring(parts[0].length + 1);
    // Conjunto de métodos permitidos en minúsculas
    if (allowedMethods.includes(method)) {
      return getRequest(endpoint, allowedMethods.indexOf(method));
    }
  }
  return;
}

function getRequest(value?: string, method?: number): RequestModel | undefined {
  if (!value) return undefined;
  if (typeof value !== "string") return undefined;
  const input: string = value;
  const unit = input.includes("?") ?? false;
  try {
    if (unit) {
      const partes: string[] = input.split("?");
      const queryString = input.substring(partes[0].length);
      const paramsString = input.substring(partes[0].length + 1);
      const parameters: string[] = paramsString.split("&");
      let newRows: ParameterRow[] = [];
      parameters.map((parameter) => {
        const values: string[] = parameter.split("=");
        newRows.push({
          id: generateRandomId(),
          estado: true,
          key: values[0] ?? "",
          value: values[1] ?? "",
        });
      });
      newRows.push({
        id: generateRandomId(),
        estado: true,
        key: "",
        value: "",
      });
      const newValue = new RequestModel(
        partes[0],
        `${queryString}`,
        newRows,
        undefined,
        method
      );
      console.log(newValue);
      return newValue;
    }
  } catch (error) {
    console.log(error);
    return;
  }
  const newValue = new RequestModel(input);
  console.log(newValue);
  return new RequestModel();
}

export { DashboardContext };
