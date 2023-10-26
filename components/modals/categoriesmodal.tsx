import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDashboardContext } from "@/context/context";

function CategoriesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [get, set] = useState("");
  const [getD, setD] = useState("");
  const [getV, setV] = useState<React.ReactNode | null>(<></>);
  const { categoriesData, updateCategoriesStorage, removeCategoriesStorage } =
    useDashboardContext();
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button-icon ">
        <ControlPointDuplicateIcon fontSize="small" />
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="gap-4 grid grid-cols-2 h-full w-full">
          <div className="flex flex-col h-full">
            <p className="mb-4 text-lg font-bold">Settings for categories</p>
            <p className="mb-2">
              Here are some options to convert your json information to your
              dart objects, hover your mouse over it for more information
            </p>

            {categoriesData.length == 0 ? (
              <div className="flex flex-col gap-2 flex-grow justify-center items-center text-center">
                Record a few categories so you can organize your requests and
                keep an order less ambiguous
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 flex-grow">
                  {categoriesData.map((e, i) => (
                    <div key={i} className="flex justify-between">
                      <span
                        onMouseEnter={() =>
                          setV(
                            <>
                              Titulo: {e.title} <br />
                              Descripción: {e.inputValue} <br />
                              Hora: {e.timeStamp} <br />
                              Guardado: {e.isSave ? "Verdadero" : "Falso"}
                            </>
                          )
                        }
                        onMouseLeave={() => setV(null)}
                      >
                        {i + 1}. {e.title}
                      </span>
                      <div
                        className=""
                        onClick={() => {
                          removeCategoriesStorage(e.timeStamp);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="bg-[#1E1E1E] w-full h-[1px] my-3 rounded-full" />
            <div className="flex items-center mb-2">
              <input
                className="w-full input-text rounded-l-2xl"
                placeholder="Enter category name"
                aria-controls=":rq:"
                aria-labelledby=":rr:"
                type="text"
                value={get}
                onChange={(e) => set(e.target.value)}
              ></input>
              <button
                className="button flex rounded-r-2xl"
                onClick={() => {
                  updateCategoriesStorage({
                    title: get,
                    inputValue: getD,
                    isSave: true,
                    timeStamp: Date.now(),
                  });
                  set("");
                  setD("");
                }}
              >
                Add
              </button>
            </div>
            <input
              className="w-full input-text rounded-2xl"
              placeholder="Enter category description"
              aria-controls=":rq:"
              aria-labelledby=":rr:"
              type="text"
              value={getD}
              onChange={(e) => setD(e.target.value)}
            ></input>
          </div>
          {getV != null ? (
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
          )}
        </div>
      </Modal>
    </>
  );
}

export default CategoriesModal;
