import UserSettings from "@/data/models/settings_model";

const generateJsonAndDownload = (jsonData: object) => {
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

// Función para leer el contenido de un archivo como texto
const readFileContent = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target?.result as string);
        resolve(content);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

const findChangedProperties = (
  oldSettings: UserSettings,
  newSettings: UserSettings
): string[] => {
  const changedProperties: string[] = [];
  // Función auxiliar para comparar dos objetos y encontrar propiedades cambiadas
  const compareObjects = (oldObj: any, newObj: any, parentKey?: string) => {
    for (const key in newObj) {
      const fullPath = parentKey ? `${parentKey}.${key}` : key;

      if (oldObj[key] !== newObj[key]) {
        if (typeof newObj[key] !== "object") {
          changedProperties.push(fullPath);
        }
      }

      if (
        typeof newObj[key] === "object" &&
        newObj[key] !== null &&
        !Array.isArray(newObj[key])
      ) {
        // Recursivamente comparar objetos anidados
        if (oldObj[key] !== undefined) {
          compareObjects(oldObj[key], newObj[key], fullPath);
        }
      }
    }
  };

  // Comparar las propiedades de UserSettings
  compareObjects(oldSettings, newSettings);

  return changedProperties;
};

export default interface ImportAndExportConfig {
  importCategories: boolean;
  importRequest: boolean;
  importSettings: boolean;
  exportCategories: boolean;
  exportRequest: boolean;
  exportSettings: boolean;
}

function copyWith(
  originalConfig: ImportAndExportConfig,
  updates: Partial<ImportAndExportConfig>
): ImportAndExportConfig {
  return {
    importCategories:
      updates.importCategories ?? originalConfig.importCategories,
    importRequest: updates.importRequest ?? originalConfig.importRequest,
    importSettings: updates.importSettings ?? originalConfig.importSettings,
    exportCategories:
      updates.exportCategories ?? originalConfig.exportCategories,
    exportRequest: updates.exportRequest ?? originalConfig.exportRequest,
    exportSettings: updates.exportSettings ?? originalConfig.exportSettings,
  };
}

export {
  copyWith,
  readFileContent,
  findChangedProperties,
  generateJsonAndDownload,
};
