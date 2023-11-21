import { useDashboardContext } from "@/context/context";
import React, { useContext } from "react";

type exportType = "categories" | "history" | "config" | "settings" | "all";

interface ButtonExportProps {
  className?: string;
  type: exportType;
}

const generateJsonAndDownload = (
  localData: any,
  categoriesData: any,
  userSettings: any
) => {
  // Datos que se agregarán al archivo JSON (puedes personalizar esto según tus necesidades)
  const jsonData = {
    Settings: userSettings,
    ListCategories: categoriesData,
    ListRequest: localData,
  };

  // Convertir el objeto a formato JSON
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Crear un objeto Blob con el contenido JSON
  const blob = new Blob([jsonString], { type: "application/json" });

  // Crear un enlace de descarga
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "datos.json";

  // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
  document.body.appendChild(a);
  a.click();

  // Limpiar el enlace y liberar recursos
  document.body.removeChild(a);
};

const ButtonExport: React.FC<ButtonExportProps> = ({}) => {
  const { localData, categoriesData, userSettings } = useDashboardContext();
  return (
    <button
      className="px-4 py-2 border border-gray-800 text-gray-800 dark:bg-gray-800 dark:text-white rounded-md transition-all duration-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:border-blue-300"
      onClick={() => {
        generateJsonAndDownload(localData, categoriesData, userSettings);
      }}
    >
      Export
    </button>
  );
};

const ResetButton: React.FC = ({}) => {
  return (
    <button className="px-4 py-2 border border-red-700 text-red-700 dark:bg-red-700 dark:text-white rounded-md transition-all duration-300 hover:bg-red-800 hover:text-white focus:outline-none focus:ring focus:border-blue-300">
      Reset
    </button>
  );
};

export default ButtonExport;

export { ResetButton };
