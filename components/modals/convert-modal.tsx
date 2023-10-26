import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
import CodeEditor from "@uiw/react-textarea-code-editor";
import SettingsIcon from "@mui/icons-material/Settings";

const descriptions: React.ReactNode[] = [
  <>
    <p className="mb-2">
      The <span className="text-blue-400">toJson</span> method defines how the
      objects properties should be represented in a JSON format. The method
      creates a map where the objects properties are mapped to their
      corresponding JSON keys, and the values are the values of these
      properties.
    </p>
    <CodeEditor
      value={`Map<String, dynamic> toJson() => {
  "example": example,
};`}
      onChange={() => false}
      language="dart"
      data-color-mode="dark"
      placeholder="Please enter Dart code."
      contentEditable={false}
      disabled
      padding={16}
      style={{
        fontSize: 12,
        backgroundColor: "#1E1E1E",
        borderRadius: "16px",
        overflow: "auto",
        flexGrow: "1",
        width: "100%",
        resize: "none",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  </>,
  <>
    <p className="mb-2">copyWith</p>
    <CodeEditor
      value={`class ApiConstants {
///Constant
static Uri uri({
required String path,
Map<String, dynamic>? queryParameters,
}) =>
Uri(
scheme: 'https',
host: 'x.aplicacion-team.com',
path: path,
queryParameters: queryParameters,
);
}`}
      onChange={() => false}
      language="dart"
      data-color-mode="dark"
      placeholder="Please enter Dart code."
      contentEditable={false}
      disabled
      padding={16}
      style={{
        fontSize: 12,
        backgroundColor: "#1E1E1E",
        borderRadius: "16px",
        overflow: "auto",
        flexGrow: "1",
        width: "100%",
        resize: "none",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  </>,
  ,
  <>
    <p className="mb-2">toString</p>
    <CodeEditor
      value={`class ApiConstants {
///Constant
static Uri uri({
required String path,
Map<String, dynamic>? queryParameters,
}) =>
Uri(
scheme: 'https',
host: 'x.aplicacion-team.com',
path: path,
queryParameters: queryParameters,
);
}`}
      onChange={() => false}
      language="dart"
      data-color-mode="dark"
      placeholder="Please enter Dart code."
      contentEditable={false}
      disabled
      padding={16}
      style={{
        fontSize: 12,
        backgroundColor: "#1E1E1E",
        borderRadius: "16px",
        overflow: "auto",
        flexGrow: "1",
        width: "100%",
        resize: "none",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  </>,
];

function ConvertModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [get, set] = useState<React.ReactNode | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="button-icon rounded-l-2xl"
      >
        <SettingsIcon fontSize="small" />
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="gap-4 grid grid-cols-2  h-full w-full">
          <div className="flex flex-col h-full">
            <p className="mb-4 text-lg font-bold">Settings for convert</p>
            <p className="mb-2">
              Here are some options to convert your json information to your
              dart objects, hover your mouse over it for more information
            </p>
            <ul className="flex-grow ">
              <li>
                <input type="checkbox" id="toJson" name="toJson" value="Bike" />
                <label htmlFor="toJson">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[0])}
                    // onMouseLeave={() => set(null)}
                  >
                    toJson
                  </span>{" "}
                  method
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="copyWith"
                  name="copyWith"
                  value="Bike"
                />
                <label htmlFor="copyWith">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    copyWith
                  </span>{" "}
                  method
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    toString
                  </span>{" "}
                  method
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Always use{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    num
                  </span>{" "}
                  type for number
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Use{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    Equatable
                  </span>{" "}
                  package
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Use{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    JSONSerializable
                  </span>{" "}
                  package
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    JSON keys
                  </span>
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Use{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    default
                  </span>{" "}
                  value
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="toString"
                  name="toString"
                  value="Bike"
                />
                <label htmlFor="toString">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    comment
                  </span>{" "}
                  of JSON
                </label>
              </li>
            </ul>
            <div className="flex gap-4">
              <button className="button w-full rounded-2xl">
                {" "}
                Import settings
              </button>
              <button className="button w-full rounded-2xl">
                {" "}
                Export settings
              </button>
            </div>
          </div>
          {get != null ? (
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
              {get}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ConvertModal;
