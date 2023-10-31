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
import { CustomDartTargetLanguage } from "@/data/data/quicktype/custom_dart_renderer";

async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  const dartLang = new CustomDartTargetLanguage({
    generateToJson: true,
    generateCopyWith: true,
    generateToString: true,
    useDefaultValue: true,
    useEquatable: true,
    useSerializable: true,
    useNum: true,
    generateKey: true,
    generateJsonComment: true,
  });
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: dartLang,
    allPropertiesOptional: true, // Nullsafety
  });
}

async function quicktypeJSONSchema(
  targetLanguage: string,
  typeName: string,
  jsonSchemaString: string
) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
  });
}

const ConvertRequest: React.FC = () => {
  const [set, get] = useState("");
  const [setv, getv] = useState("");
  const [className, setClassName] = useState("");
  const handleClickGenerate = async () => {
    getv(set);
    try {
      const { lines: swiftPerson } = await quicktypeJSON(
        "dart",
        className,
        set
      );
      getv(swiftPerson.join("\n"));
      console.log(swiftPerson.join("\n"));
    } catch (error) {
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
