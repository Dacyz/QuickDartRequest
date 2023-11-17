import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
import { useDashboardContext } from "@/context/context";
import { Settings } from "@mui/icons-material";
import AvatarLetter from "../labels/avatar";
import { copyWithSettings } from "@/data/models/settings_model";

function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [getD, setD] = useState("");
  const [getV, setV] = useState<React.ReactNode | null>(<></>);
  const { userSettings, updateUserSettings } = useDashboardContext();
  return (
    <>
      <div
        className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(true)}
      >
        <Settings />
        Settings
      </div>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
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
            <p className="mb-2">Sidebar side</p>
            <div className="flex gap-2">
              <div className="w-full box-decoration-slice">
                <div
                  className={`flex h-32 p-3 w-full mb-2 rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                >
                  <div className="flex bg-[#484848] w-[20%] h-full rounded-l-lg items-center align-middle justify-center">
                    S
                  </div>
                  <div className="bg-[#1E1E1E] w-[80%] h-full rounded-r-lg" />
                </div>
                Show history on the left side of the interface
              </div>
              <div className="w-full">
                <div
                  className={`flex h-32 p-3 mb-2 w-full rounded-lg hover:border hover:border-[#484848] align-middle items-center justify-center ${
                    !userSettings.sideBarAlign ? "bg-[#1E1E1E]" : "bg-[#3a3a39]"
                  }`}
                >
                  <div className=" bg-[#1E1E1E] w-[80%] h-full rounded-l-lg" />
                  <div className="flex bg-[#484848] w-[20%] h-full rounded-r-lg items-center align-middle justify-center">
                    S
                  </div>
                </div>
                Show history on the right side of the interface
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-grow"></div>
            {/* <div className="bg-[#1E1E1E] w-full h-[1px] my-3 rounded-full" />
            <input
              className="w-full input-text rounded-2xl"
              placeholder="Enter category description"
              aria-controls=":rq:"
              aria-labelledby=":rr:"
              type="text"
              value={getD}
              onChange={(e) => setD(e.target.value)}
            ></input> */}
          </div>
          {/* {getV != null ? (
            <div
              onChange={() => false}
              style={{
                fontSize: 12,
                margin: "32px 0px 0px 0px",
                backgroundColor: "#FFFFFF10",
                padding: "16px",
                borderRadius: "16px",
                overflow: "auto",
                alignItems: "center",
                justifyItems: "center",
                flexGrow: "1",
                width: "100%",
                gap: "16px",
                resize: "none",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            >
              {getV}
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </Modal>
    </>
  );
}

export default SettingsModal;
