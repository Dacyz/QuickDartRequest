"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import ConvertModal from "../modals/convert-modal";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaInput,
  FetchingJSONSchemaStore,
} from "quicktype-core";
import { toast } from "sonner";
import { CustomDartTargetLanguage } from "@/data/data/quicktype/custom_dart_renderer";
import ConfigConvert from "@/data/models/config_model";
import { useDashboardContext } from "@/context/context";

async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string,
  configModel: ConfigConvert
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  const dartLang = new CustomDartTargetLanguage({
    generateToJson: configModel.generateToJson,
    generateCopyWith: configModel.generateCopyWith,
    generateToString: configModel.generateToString,
    useDefaultValue: configModel.useDefaultValue,
    useEquatable: configModel.useEquatable,
    useSerializable: configModel.useSerializable,
    useNum: configModel.useNum,
    generateKey: configModel.generateKey,
    generateJsonComment: configModel.generateJsonComment,
  });
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);
  return await quicktype({
    inputData,
    lang: configModel.useDefaultProperties ? "dart" : dartLang,
    allPropertiesOptional: configModel.propertiesNullable, // Nullsafety
  });
}

const ConvertRequest: React.FC = () => {
  const { userSettings } = useDashboardContext();
  const [set, get] = useState("");
  const [setv, getv] = useState("");
  const [className, setClassName] = useState("");
  const handleClickGenerate = async () => {
    try {
      if (set.length == 0) {
        toast.error("Json Object must to be not empty");
        return;
      }
      if (className.length == 0) {
        toast.error("ClassName must to be not empty");
        return;
      }
      const { lines: swiftPerson } = await quicktypeJSON(
        "dart",
        className,
        set,
        userSettings.configConvert
      );
      getv(swiftPerson.join("\n"));
      console.log(swiftPerson.join("\n"));
    } catch (error: any) {
      toast.error(`${error.message}`);
      console.error(error);
    }
  };
  return (
    <div className="gap-4 grid grid-cols-2 h-full w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <ConvertModal />
          <input
            className="w-full input-text"
            placeholder="Enter classname"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            aria-controls=":rq:"
            aria-labelledby=":rr:"
            type="text"
          ></input>
          <button
            className="button flex rounded-r-2xl"
            onClick={handleClickGenerate}
          >
            Convert
          </button>
        </div>
        <CodeEditor
          value={set}
          onChange={(e) => {
            get(e.target.value);
          }}
          language="json"
          data-color-mode="dark"
          placeholder="Please enter JSON object."
          contentEditable={false}
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
      </div>
      {/* <LineSeparator /> */}
      <div className="flex flex-col gap-4">
        <CodeEditor
          value={setv}
          language="dart"
          data-color-mode="dark"
          placeholder="Here will be your dart code."
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
        <button className="button w-full rounded-2xl">
          {" "}
          <CopyAllIcon /> Copy
        </button>
      </div>
    </div>
  );
};

export default ConvertRequest;
