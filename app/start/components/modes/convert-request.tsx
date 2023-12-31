"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import ConvertModal from "../../../../components/modals/convert-modal";
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} from "quicktype-core";
import { toast } from "sonner";
import { CustomDartTargetLanguage } from "@/data/data/quicktype/custom_dart_renderer";
import ConfigConvert from "@/data/models/config_model";
import { useDashboardContext } from "@/data/context/context";

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
  const { userSettings, setRequestModel, requestModel } = useDashboardContext();
  const [setv, getv] = useState("");
  const setObject = (value: string) => {
    setRequestModel(requestModel.copyWith({ jsonObject: value }));
  };
  const setClassName = (value: string) => {
    setRequestModel(requestModel.copyWith({ nameObject: value }));
  };
  const handleClickGenerate = async () => {
    try {
      if (requestModel.jsonObject.length == 0) {
        toast.error("Json Object must to be not empty");
        return;
      }
      if (requestModel.nameObject.length == 0) {
        toast.error("ClassName must to be not empty");
        return;
      }
      const { lines: swiftPerson } = await quicktypeJSON(
        "dart",
        requestModel.nameObject,
        requestModel.jsonObject,
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
    <div className="flex flex-col md:flex-row gap-4 grid-cols-2 h-full w-full">
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex items-center">
          <ConvertModal />
          <input
            className="w-full input-text"
            placeholder="Enter classname"
            value={requestModel.nameObject}
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
          value={requestModel.jsonObject}
          onChange={(e) => {
            setObject(e.target.value);
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
      <div className="flex flex-col gap-4 w-full h-full">
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
          <CopyAllIcon /> Copy
        </button>
      </div>
    </div>
  );
};

export default ConvertRequest;
