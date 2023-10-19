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

interface DashboardContextData {
  localData: ResponseModel[];
  requestModel: RequestModel;
  setRequestModel: React.Dispatch<React.SetStateAction<RequestModel>>;
  updateLocalStorage: (data: ResponseModel) => void;
  removeLocalStorage: (data: number) => void;
}

const DashboardContext = createContext<DashboardContextData | undefined>(
  undefined
);

const separator: string = ":";
const allowedMethods: string[] = ["get", "post", "put", "delete"];

export const DashboardProvider: React.FC<DashboardContextProps> = ({
  children,
}) => {
  const [localData, setLocalData] = useState<ResponseModel[]>([]);
  const [requestModel, setRequestModel] = useState<RequestModel>(
    new RequestModel()
  );

  // const updateRequestModel = (changes: Partial<RequestModel>) => {
  //   setRequestModel(
  //     requestModel.copyWith({
  //       headers: [
  //         ...requestModel.headers,
  //         {
  //           id: generateRandomId(),
  //           estado: true,
  //           key: "",
  //           value: "",
  //           hidden: true,
  //         },
  //       ],
  //     })
  //   );
  // };

  // Función para actualizar y agregar datos al localStorage
  const updateLocalStorage = (newData: ResponseModel) => {
    const updatedData = [...localData, newData];
    localStorage.setItem("miLista", JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  // Función para actualizar y agregar datos al localStorage
  const removeLocalStorage = (newData: number) => {
    const updatedData = localData.filter(
      (objeto) => objeto.TimeStamp !== newData
    );
    localStorage.setItem("miLista", JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const storedDataString = localStorage.getItem("miLista") || "";
    let storedData = [];
    let model: RequestModel = new RequestModel();
    try {
      storedData = JSON.parse(storedDataString) || [];
    } catch (error) {
      console.error("Error al analizar los datos de localStorage:", error);
      // Puedes proporcionar un valor predeterminado en caso de un error de análisis.
      storedData = []; // O cualquier otro valor predeterminado que desees.
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
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        localData: localData,
        requestModel: requestModel,
        updateLocalStorage: updateLocalStorage,
        removeLocalStorage: removeLocalStorage,
        setRequestModel: setRequestModel,
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
