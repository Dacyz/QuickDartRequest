import { useDashboardContext } from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AvatarLetter from "../labels/avatar";
import { Title } from "../labels/title";
import { Forest, Window, Settings, Logout } from "@mui/icons-material";
import Link from "next/link";
import UserSettings, { copyWithSettings } from "@/data/models/settings_model";
import Modal from "./modal";
import { toast } from "sonner";
import Switch from "../buttons/switch";
import ButtonExport, { ResetButton } from "../buttons/buttons";
import FilePicker from "../buttons/file-picker";
import LineSeparator from "../other/line-separator";

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

interface TitleProps {
  className?: string;
}

interface ImportAndExportConfig {
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

const DropDownSettingsBox: React.FC<TitleProps> = (className) => {
  const [isOpen, setOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModal] = useState(false);
  const [isDataControlsOpen, setDataControlsModal] = useState(false);
  const [config, setConfig] = useState<ImportAndExportConfig>({
    importCategories: false,
    importRequest: false,
    importSettings: false,
    exportCategories: true,
    exportRequest: true,
    exportSettings: true,
  });
  const [jsonImport, setJsonImport] = useState<any | null>(null);

  // const [isInstructionsOpen, setInstructionsModal] = useState(false);
  const { userSettings, updateUserSettings, localData, categoriesData } =
    useDashboardContext();
  return (
    <>
      <div
        className="relative flex-row flex cursor-pointer gap-2 min-w-[72px] text-center text-[12px] justify-start items-center hover:bg-[#1E1E1E] p-2"
        style={{
          borderRadius: !isOpen ? "16px" : "0 0 16px 16px",
        }}
        onClick={() => setOpen(!isOpen)}
        onMouseLeave={() => setOpen(false)}
      >
        <AvatarLetter text={userSettings.userName} />
        <Title style="small" text={userSettings.userName} />
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -20, opacity: [0.1, 1] }}
              exit={{ y: 0, opacity: [0.5, 0] }}
              transition={{ duration: 0.1 }}
              className="absolute w-[288px] left-0 bg-[#1E1E1E] rounded-b-2xl z-50"
            >
              <div
                className="absolute bottom-full left-0 z-20 mb-1 w-full overflow-hidden rounded-lg bg-white pb-1.5 pt-1 outline-none gizmo:border gizmo:border-gray-100 dark:bg-[#1E1E1E] opacity-100 translate-y-0"
                role="menu"
                tabIndex={0}
                data-headlessui-state="open"
              >
                <nav role="none">
                  {/* <a
                    className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    id="headlessui-menu-item-:r42:"
                    role="menuitem"
                    tabIndex={-1}
                    data-headlessui-state=""
                  >
                    <Forest />
                    Custom instructions
                  </a> */}
                  <a
                    className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    id="headlessui-menu-item-:r42:"
                    role="menuitem"
                    tabIndex={-1}
                    data-headlessui-state=""
                    onClick={() => setDataControlsModal(true)}
                  >
                    <Window />
                    Data controls
                  </a>
                  <div
                    className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setSettingsModal(true)}
                  >
                    <Settings />
                    Settings
                  </div>
                  <div
                    className="h-px dark:bg-white/10 bg-black/20"
                    role="none"
                  />
                  <Link
                    href={"/about"}
                    className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    id="headlessui-menu-item-:r44:"
                    role="menuitem"
                    tabIndex={-1}
                    data-headlessui-state=""
                  >
                    <Logout />
                    Leave
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Modal
        handleClose={() => setSettingsModal(false)}
        isOpen={isSettingsModalOpen}
      >
        <div className="gap-4 grid grid-cols-1 h-full w-full">
          <div className="flex flex-col h-full">
            <p className="mb-4 text-lg font-bold">Settings for user</p>
            <p className="mb-2">
              Here are some options to personalize your experience and improve
              your productivity
            </p>
            <div className="flex gap-2 mb-2">
              <AvatarLetter text={userSettings.userName} />
              <input
                className="input-text w-full rounded-2xl"
                placeholder="Enter user name"
                aria-controls=":rq:"
                aria-labelledby=":rr:"
                type="text"
                value={userSettings.userName}
                onChange={(e) =>
                  updateUserSettings(
                    copyWithSettings(userSettings, {
                      userName: e.target.value,
                    })
                  )
                }
              />
            </div>
            <p className="m-2 font-bold">Sidebar side</p>
            <div
              className="flex gap-2"
              style={{
                fontSize: 12,
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            >
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() =>
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        sideBarAlign: false,
                      })
                    )
                  }
                >
                  <div className="flex bg-[#484848] w-[20%] h-full rounded-l-lg items-center align-middle justify-center">
                    S
                  </div>
                  <div className="bg-[#161515] w-[80%] h-full rounded-r-lg" />
                </div>
                Show history on the left side of the interface
              </div>
              <div className="w-full">
                <div
                  className={`flex h-32 p-3 mb-2 w-full rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    !userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() =>
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        sideBarAlign: true,
                      })
                    )
                  }
                >
                  <div className=" bg-[#161515] w-[80%] h-full rounded-l-lg" />
                  <div className="flex bg-[#484848] w-[20%] h-full rounded-r-lg items-center align-middle justify-center">
                    S
                  </div>
                </div>
                Show history on the right side of the interface
              </div>
            </div>
            <p className="m-2 font-bold">Alert notification</p>
            <div
              className="flex gap-2"
              style={{
                fontSize: 12,
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            >
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.toastAlign !== "top-left" ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        toastAlign: "top-left",
                      })
                    );
                    toast("Setting updated", {
                      description: "New alert position: Top Left",
                    });
                  }}
                >
                  <div className="bg-[#161515] p-2 w-full h-full rounded-lg">
                    <div className="flex bg-[#484848] w-10 h-5 rounded-lg" />
                  </div>
                </div>
                Show history on the left side of the interface
              </div>
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.toastAlign !== "top-right" ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        toastAlign: "top-right",
                      })
                    );
                    toast("Setting updated", {
                      description: "New alert position: Top Right",
                    });
                  }}
                >
                  <div className="flex justify-end bg-[#161515] p-2 w-full h-full rounded-lg">
                    <div className="bg-[#484848] w-10 h-5 rounded-lg" />
                  </div>
                </div>
                Show history on the left side of the interface
              </div>
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.toastAlign !== "bottom-left" ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        toastAlign: "bottom-left",
                      })
                    );
                    toast("Setting updated", {
                      description: "New alert position: Bottom Left",
                    });
                  }}
                >
                  <div className="flex items-end bg-[#161515] p-2 w-full h-full rounded-lg">
                    <div className="bg-[#484848] w-10 h-5 rounded-lg" />
                  </div>
                </div>
                Show history on the left side of the interface
              </div>
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.toastAlign !== "bottom-right" ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                  onClick={() => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        toastAlign: "bottom-right",
                      })
                    );
                    toast("Setting updated", {
                      description: "New alert position: Bottom Right",
                    });
                  }}
                >
                  <div className="flex items-end justify-end bg-[#161515] p-2 w-full h-full rounded-lg">
                    <div className="bg-[#484848] w-10 h-5 rounded-lg" />
                  </div>
                </div>
                Show history on the left side of the interface
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-grow"></div>
          </div>
        </div>
      </Modal>
      <Modal
        handleClose={() => setDataControlsModal(false)}
        isOpen={isDataControlsOpen}
      >
        <p className="text-lg font-bold">Controls for Data</p>
        <p>
          Here are some options to export or import your data and improve your
          productivity
        </p>
        <div className="gap-4 flex h-full w-full">
          <div className="flex gap-3 flex-col w-full">
            <p className="font-bold">Import</p>
            <FilePicker
              onChange={async (file: File) => {
                // Leer el contenido del archivo y obtener las llaves
                const fileContent = await readFileContent(file);
                const changes = findChangedProperties(
                  userSettings,
                  fileContent["Settings"]
                );
                setJsonImport(fileContent);
                setConfig(
                  copyWith(config, {
                    importCategories:
                      (jsonImport ? jsonImport["ListCategories"] : false) !==
                      null,
                    importRequest:
                      (jsonImport ? jsonImport["ListRequest"] : false) !== null,
                    importSettings:
                      (jsonImport ? jsonImport["Settings"] : false) !== null,
                  })
                );
                console.log(changes);
              }}
              onClear={() => {
                setJsonImport(null);
                setConfig(
                  copyWith(config, {
                    importCategories: false,
                    importRequest: false,
                    importSettings: false,
                  })
                );
              }}
            />
            {jsonImport ? (
              <ul className="m-2 flex flex-col gap-4">
                {jsonImport["ListCategories"] ? (
                  <li className="flex items-center align-middle justify-between ">
                    Import the list of categories{" "}
                    <Switch
                      value={config.importCategories}
                      onChange={(value) => {
                        setConfig(
                          copyWith(config, {
                            importCategories: value,
                          })
                        );
                      }}
                    />
                  </li>
                ) : (
                  <></>
                )}
                {jsonImport["ListRequest"] ? (
                  <li className="flex items-center align-middle justify-between ">
                    Import request history
                    <Switch
                      value={config.importRequest}
                      onChange={(value) => {
                        setConfig(
                          copyWith(config, {
                            importRequest: value,
                          })
                        );
                      }}
                    />
                  </li>
                ) : (
                  <></>
                )}
                {jsonImport["Settings"] ? (
                  <li className="flex items-center align-middle justify-between ">
                    Import user settings
                    <Switch
                      value={config.importSettings}
                      onChange={(value) => {
                        setConfig(
                          copyWith(config, {
                            importSettings: value,
                          })
                        );
                      }}
                    />
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            ) : (
              <></>
            )}
            {config.importCategories ||
            config.importRequest ||
            config.importSettings ? (
              <div className="flex gap-2 items-center align-middle justify-between ">
                Import{" "}
                <ButtonExport
                  text="Import"
                  onClick={() => {
                    toast.success("Successful import!");
                  }}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="flex flex-col gap-2 flex-grow"></div>
          </div>
          <LineSeparator />
          <div className="flex gap-3 flex-col w-full">
            <p className="font-bold">Export </p>
            <ul className="m-2 flex flex-col gap-4">
              <li className="flex items-center align-middle justify-between ">
                Export the list of categories{" "}
                <Switch
                  value={config.exportCategories}
                  onChange={(value) => {
                    setConfig(
                      copyWith(config, {
                        exportCategories: value,
                      })
                    );
                    console.log(config.exportCategories);
                  }}
                />
              </li>
              <li className="flex items-center align-middle justify-between ">
                Export request history
                <Switch
                  value={config.exportRequest}
                  onChange={(value) => {
                    setConfig(
                      copyWith(config, {
                        exportRequest: value,
                      })
                    );
                  }}
                />
              </li>
              <li className="flex items-center align-middle justify-between ">
                Export user settings
                <Switch
                  value={config.exportSettings}
                  onChange={(value) => {
                    setConfig(
                      copyWith(config, {
                        exportSettings: value,
                      })
                    );
                  }}
                />
              </li>
            </ul>
            {config.exportSettings ||
            config.exportRequest ||
            config.exportCategories ? (
              <div className="flex gap-2 items-center align-middle justify-between ">
                Export{" "}
                <ButtonExport
                  text="Export"
                  onClick={() => {
                    // Datos que se agregarán al archivo JSON (puedes personalizar esto según tus necesidades)
                    // Comprobaciones de exportación
                    const jsonData: { [key: string]: any } = {};
                    if (config.exportSettings) {
                      jsonData.Settings = userSettings;
                    }
                    if (config.exportCategories) {
                      jsonData.ListCategories = categoriesData;
                    }
                    if (config.exportRequest) {
                      jsonData.ListRequest = localData;
                    }
                    generateJsonAndDownload(jsonData);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center align-middle justify-between ">
          Reset all lists and settings <ResetButton />
        </div>
      </Modal>
    </>
  );
};

export default DropDownSettingsBox;
