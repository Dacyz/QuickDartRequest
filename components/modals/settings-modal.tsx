import { useDashboardContext } from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AvatarLetter from "../labels/avatar";
import { Title } from "../labels/title";
import { Forest, Window, Settings } from "@mui/icons-material";
import Link from "next/link";
import { copyWithSettings } from "@/data/models/settings_model";
import Modal from "./modal";
import { toast } from "sonner";

interface TitleProps {
  className?: string;
}

const DropDownSettingsBox: React.FC<TitleProps> = (className) => {
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { userSettings, updateUserSettings } = useDashboardContext();
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
                aria-labelledby="headlessui-menu-button-:r3r:"
                id="headlessui-menu-items-:r41:"
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
                  <div
                    className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setModalOpen(true)}
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
                    <Window />
                    Leave
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Modal handleClose={() => setModalOpen(false)} isOpen={isModalOpen}>
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
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
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
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
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
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
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
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
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
    </>
  );
};

export default DropDownSettingsBox;
