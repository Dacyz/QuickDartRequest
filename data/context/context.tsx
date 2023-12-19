"use client";
import { generateRandomId } from "@/utils/helpers/number_extension";
import {
  listCategories,
  listRequest,
  listSettings,
} from "@/utils/helpers/string_extension";
import CategoryType from "@/data/models/category_model";
import { ParameterRow } from "@/data/models/parameter";
import RequestModel from "@/data/models/request_model";
import ResponseModel from "@/data/models/response_model";
import UserSettings, { settings } from "@/data/models/settings_model";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Toaster, toast } from "sonner";
import { getProperties } from "@/utils/helpers/request_extension";

interface DashboardContextProps {
  children: ReactNode;
  url?: string;
  body?: string;
  method?: string;
}

interface DashboardContextData {
  localData: RequestModel[];
  categoriesData: CategoryType[];
  requestModel: RequestModel;
  responseModel: ResponseModel | null;
  userSettings: UserSettings;
  loadingData: boolean;
  setRequestModel: React.Dispatch<React.SetStateAction<RequestModel>>;
  updateLocalStorage: (data: RequestModel) => void;
  removeLocalStorage: (data: number) => void;
  setRequestName: (newName: string) => void;
  saveRequestModel: () => void;
  updateRequestModel: () => void;
  clearLocalStorage: () => void;
  setRequestCategory: (newName: string | undefined) => void;
  updateCategoriesStorage: (newData: CategoryType) => void;
  removeCategoriesStorage: (newData: number) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setResponseModel: (newData: ResponseModel | null) => void;
  updateUserSettings: (newData: UserSettings) => void;
  updateLocalDataIfNotExists: (newDataList: RequestModel[]) => void;
  updateLocalCategoriesIfNotExists: (newCategoriesList: CategoryType[]) => void;
}

const DashboardContext = createContext<DashboardContextData | undefined>(
  undefined
);

export const DashboardProvider: React.FC<DashboardContextProps> = ({
  children,
  url,
  method,
  body,
}) => {
  const [localData, setLocalData] = useState<RequestModel[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);
  const [requestModel, setRequestModel] = useState<RequestModel>(
    getProperties(url, method) ?? new RequestModel()
  );
  const [userSettings, setUserSettings] = useState<UserSettings>(settings);
  const [responseModel, setResponse] = useState<ResponseModel | null>(null);

  const updateRequestStorage = (newData: RequestModel) => {
    const updatedData = [...localData, newData];
    localStorage.setItem(listRequest, JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  const updateRequestModel = () => {
    const index = localData.findIndex(
      (item) => item.timeStamp === requestModel.timeStamp
    );
    if (index !== -1) {
      const updatedData = [...localData];
      updatedData[index] = requestModel;
      localStorage.setItem(listRequest, JSON.stringify(updatedData));
      setLocalData(updatedData);
    }
  };

  const updateUserSettings = (newData: UserSettings) => {
    localStorage.setItem(listSettings, JSON.stringify(newData));
    setUserSettings(newData);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(listRequest);
    localStorage.removeItem(listCategories);
    localStorage.removeItem(listSettings);

    setLocalData([]);
    setCategoriesData([]);
    setUserSettings(settings);

    toast.success("LocalStorage limpiado correctamente");
  };

  const updateLocalDataIfNotExists = (newDataList: RequestModel[]) => {
    const updatedData = [...localData];

    newDataList.forEach((newData) => {
      const exists = localData.some(
        (item) => item.timeStamp === newData.timeStamp
      );

      if (!exists) {
        updatedData.push(newData);
      }
    });

    localStorage.setItem(listRequest, JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  const updateLocalCategoriesIfNotExists = (
    newCategoriesList: CategoryType[]
  ) => {
    const updatedCategories = [...categoriesData];

    newCategoriesList.forEach((newCategory) => {
      const exists = categoriesData.some(
        (item) => item.timeStamp === newCategory.timeStamp
      );

      if (!exists) {
        updatedCategories.push(newCategory);
      }
    });

    localStorage.setItem(listCategories, JSON.stringify(updatedCategories));
    setCategoriesData(updatedCategories);
  };

  const setResponseModel = (newData: ResponseModel | null) =>
    setResponse(newData);
  const updateCategoriesStorage = (newData: CategoryType) => {
    const updatedData = [...categoriesData, newData];
    localStorage.setItem(listCategories, JSON.stringify(updatedData));
    setCategoriesData(updatedData);
  };

  // Función para remover datos del localStorage
  const removeLocalStorage = (newData: number) => {
    console.log(localData);
    const updatedData = localData.filter(
      (objeto) => objeto.timeStamp !== newData
    );
    localStorage.setItem(listRequest, JSON.stringify(updatedData));
    setLocalData(updatedData);
    console.log(updatedData);
    if (requestModel.timeStamp === 0) return;
    if (updatedData.length === 0) {
      setRequestModel(new RequestModel());
    } else {
      setRequestModel(updatedData[0]);
    }
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
    console.log(updatedRequest);
    setRequestModel(updatedRequest);
  };

  const setRequestCategory = (newName: string | undefined) => {
    const updatedRequest = requestModel.copyWith({ group: newName });
    setRequestModel(updatedRequest);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input: string = event.target.value;
    const newRows: ParameterRow[] = [];
    try {
      if (input.includes("?")) {
        const partes: string[] = input.split("?"); // Dividir la cadena
        const queryString = input.substring(partes[0].length);
        const paramsString = input.substring(partes[0].length + 1);
        const parameters: string[] = paramsString.split("&");
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
        const newValue = requestModel.copyWith({
          host: partes[0],
          query: `${queryString}`,
          params: newRows,
        });
        setRequestModel(newValue); // Actualiza el estado con el valor del input
        return;
      }
      newRows.push({
        id: generateRandomId(),
        estado: true,
        key: "",
        value: "",
      });
      const newValue = requestModel.copyWith({
        host: input,
        params: newRows,
        query: "",
      });
      setRequestModel(newValue); // Actualiza el estado con el valor del input
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  // Función para guardar una nueva petición
  // TODO: VALIDAR MODELOS ANTERIORES
  const saveRequestModel = () => {
    try {
      const newModel = requestModel.copyWith({ timeStamp: Date.now() });
      updateRequestStorage(newModel); // Actualiza el localStorage con los datos obtenidos
      setRequestModel(newModel);
      toast.success("Guardado correctamente");
    } catch (error) {
      console.error("Error al guardar la petición", error);
    }
  };

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const storedDataString = localStorage.getItem(listRequest);
    const storedCategoriesString = localStorage.getItem(listCategories);
    const storedSettingString = localStorage.getItem(listSettings);
    let storedData: RequestModel[] = [];
    let storedCategoriesData: CategoryType[] = [];
    let configM: UserSettings = settings;
    try {
      if (storedDataString !== null)
        storedData = JSON.parse(storedDataString) || [];
      if (storedCategoriesString !== null)
        storedCategoriesData = JSON.parse(storedCategoriesString) || [];
      if (storedSettingString !== null)
        configM = JSON.parse(storedSettingString) || settings;
    } catch (error) {
      console.error("Error al analizar los datos de localStorage:", error);
    }
    console.log(`List: [${storedData.length}]`);
    setLocalData(storedData);
    setUserSettings(configM);
    setCategoriesData(storedCategoriesData);
    setLoadingData(true);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        localData: localData,
        categoriesData: categoriesData,
        requestModel: requestModel,
        responseModel: responseModel,
        userSettings: userSettings,
        loadingData: loadingData,
        updateRequestModel: updateRequestModel,
        updateLocalStorage: updateRequestStorage,
        removeLocalStorage: removeLocalStorage,
        setRequestModel: setRequestModel,
        setRequestName: setRequestName,
        saveRequestModel: saveRequestModel,
        setRequestCategory: setRequestCategory,
        updateCategoriesStorage: updateCategoriesStorage,
        removeCategoriesStorage: removeCategoriesStorage,
        handleInputChange: handleInputChange,
        setResponseModel: setResponseModel,
        updateUserSettings: updateUserSettings,
        updateLocalDataIfNotExists: updateLocalDataIfNotExists,
        updateLocalCategoriesIfNotExists: updateLocalCategoriesIfNotExists,
        clearLocalStorage: clearLocalStorage,
      }}
    >
      <Toaster theme="dark" richColors position={userSettings.toastAlign} />
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

export { DashboardContext };
