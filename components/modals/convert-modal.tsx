import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
import CodeEditor from "@uiw/react-textarea-code-editor";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDashboardContext } from "@/data/context/context";
import { copyWith } from "@/data/models/config_model";
import { copyWithSettings } from "@/data/models/settings_model";

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
    <p className="mb-2">
      The <span className="text-blue-400">copyWith</span> method is commonly
      used in programming to create an immutable copy of an object with some
      properties modified. This method allows for selective updates to an object
      without directly modifying the original object. When is invoked, a new
      instance of the object is returned with the desired changes, while leaving
      the untouched properties unchanged.
    </p>
    <CodeEditor
      value={`Example copyWith({
    String? example,
}) {
    return Example(
        example: example ?? this.example,
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
  <>
    <p className="mb-2">
      The <span className="text-blue-400">toString</span> method is used to
      obtain a string representation of an object. In programming, especially in
      object-oriented languages, the toString method is implemented to return a
      string that provides a readable representation of the object{"'"}s state.
      This is useful for debugging and displaying information.
    </p>
    <CodeEditor
      value={`@override
String toString(){
    return "$example, ";
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
  const { userSettings, updateUserSettings } = useDashboardContext();
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
                <input
                  type="checkbox"
                  id="toJson"
                  name="toJson"
                  value="Bike"
                  checked={userSettings.configConvert.generateToJson}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          generateToJson: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
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
                  checked={userSettings.configConvert.generateCopyWith}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          generateCopyWith: event.target.checked,
                        }),
                      })
                    );
                  }}
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
                  checked={userSettings.configConvert.generateToString}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          generateToString: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="toString">
                  {" "}
                  Generate{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[2])}
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
                  id="useNum"
                  name="useNum"
                  value="Bike"
                  checked={userSettings.configConvert.useNum}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          useNum: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="useNum">
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
                  id="useEquatable"
                  name="useEquatable"
                  value="Bike"
                  checked={userSettings.configConvert.useEquatable}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          useEquatable: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="useEquatable">
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
                  id="useSerializable"
                  name="useSerializable"
                  value="Bike"
                  checked={userSettings.configConvert.useSerializable}
                  onChange={(event) => {
                    console.log(event.target.checked ? "wa" : "s");
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          useSerializable: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="useSerializable">
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
                  id="generateKey"
                  name="generateKey"
                  value="Bike"
                  checked={userSettings.configConvert.generateKey}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          generateKey: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="generateKey">
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
                  id="useDefaultValue"
                  name="useDefaultValue"
                  value="Bike"
                  checked={userSettings.configConvert.useDefaultValue}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          useDefaultValue: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="useDefaultValue">
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
                  id="generateJsonComment"
                  name="generateJsonComment"
                  value="Bike"
                  checked={userSettings.configConvert.generateJsonComment}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          generateJsonComment: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="generateJsonComment">
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
              <li>
                <input
                  type="checkbox"
                  id="propertiesNullable"
                  name="propertiesNullable"
                  value="Bike"
                  checked={userSettings.configConvert.propertiesNullable}
                  onChange={(event) => {
                    updateUserSettings(
                      copyWithSettings(userSettings, {
                        configConvert: copyWith(userSettings.configConvert, {
                          propertiesNullable: event.target.checked,
                        }),
                      })
                    );
                  }}
                />
                <label htmlFor="propertiesNullable">
                  {" "}
                  Use{" "}
                  <span
                    className="text-blue-400"
                    onMouseEnter={() => set(descriptions[1])}
                    // onMouseLeave={() => set(null)}
                  >
                    nullable
                  </span>{" "}
                  properties
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
