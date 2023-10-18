"use client";
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
  localData: ListItem[];
  updateLocalStorage: (data: ListItem) => void;
  removeLocalStorage: (data: number) => void;
}

const DashboardContext = createContext<DashboardContextData | undefined>(
  undefined
);

export const DashboardProvider: React.FC<DashboardContextProps> = ({
  children,
}) => {
  const [localData, setLocalData] = useState<ListItem[]>([]);

  // Función para actualizar y agregar datos al localStorage
  const updateLocalStorage = (newData: ListItem) => {
    // Aquí puedes realizar cualquier lógica que necesites antes de guardar los datos
    // Por ejemplo, agregar nuevos datos a la lista existente
    const updatedData = [...localData, newData];

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("miLista", JSON.stringify(updatedData));

    // Actualizar el estado del contexto
    setLocalData(updatedData);
  };

  // Función para actualizar y agregar datos al localStorage
  const removeLocalStorage = (newData: number) => {
    // Aquí puedes realizar cualquier lógica que necesites antes de guardar los datos
    // Por ejemplo, agregar nuevos datos a la lista existente

    const updatedData = localData.filter((objeto) => objeto.TimeStamp !== newData);

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("miLista", JSON.stringify(updatedData));

    // Actualizar el estado del contexto
    setLocalData(updatedData);
  };

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const storedDataString = localStorage.getItem("miLista") || "";
    let storedData = [];
    try {
      storedData = JSON.parse(storedDataString) || [];
    } catch (error) {
      console.error("Error al analizar los datos de localStorage:", error);
      // Puedes proporcionar un valor predeterminado en caso de un error de análisis.
      storedData = []; // O cualquier otro valor predeterminado que desees.
    }
    // const storedData = JSON.parse(localStorage.getItem("miLista") || "") || [];
    setLocalData(storedData);
    // updateLocalStorage(storedData);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ localData: localData, updateLocalStorage, removeLocalStorage }}
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

export { DashboardContext };
