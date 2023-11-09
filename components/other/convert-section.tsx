/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";
import ConvertModal from "../modals/convert-modal";
import { useDashboardContext } from "@/context/context";
import LineSeparator from "./line-separator";
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
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

const ConvertSection: React.FC = () => {
  const { responseModel } = useDashboardContext();
  const [className, setClassName] = useState("");
  const [convert, setConvert] = useState("");

  const handleClickGenerate = async () => {
    try {
      const { lines: swiftPerson } = await quicktypeJSON(
        "dart",
        className,
        JSON.stringify(responseModel?.jsonResponse) ?? ""
      );
      setConvert(swiftPerson.join("\n"));
    } catch (error) {
      console.error(error, className);
      console.log(responseModel?.jsonResponse?.toString());
    }
  };

  if (responseModel === null) {
    return <></>;
  }
  const contentTypeHeader =
    responseModel.Response.headers.get("Content-Type") ?? "*/*";
  if (contentTypeHeader.includes("image/")) {
    const imageWidget = `Image.network(
  // Your URL of your image
  '${responseModel.Enlace}', 
  loadingBuilder: (BuildContext context, Widget child, ImageChunkEvent? loadingProgress) {
    if (loadingProgress == null) {
      return child;
    }
    return Center(
      child: CircularProgressIndicator(
        value: loadingProgress.expectedTotalBytes != null
            ? loadingProgress.cumulativeBytesLoaded / loadingProgress.expectedTotalBytes!
            : null,
      ),
    );
  },
),`;
    const imageHttp = `import 'package:http/http.dart' as http;
import 'dart:typed_data';

// Replaced with the URL of your image
final response = await http.get(Uri.parse('${responseModel.Enlace}'));
if (response.statusCode == 200) {
  final imageBytes = response.bodyBytes; // Utiliza imageBytes como necesites
}`;
    return (
      <div className="min-w-[640px] max-w-[640px] overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded ">
        <div
          onChange={() => false}
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
          contentEditable={false}
          style={{
            fontSize: 12,
            width: "100%",
            padding: "16px",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        >
          To fetch an image from a URL in Flutter, you can use the{" "}
          <span className="font-bold">Image.network</span> widget or the{" "}
          <span className="font-bold">Image.network</span> class if you are
          working with Dart code. <br />
          <br />
          Here{"'"}s how to do it: Using the{" "}
          <span className="font-bold">Image.network</span> widget in the Flutter
          widget tree:
        </div>
        <CodeEditor
          value={imageWidget}
          language="dart"
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
          contentEditable={false}
          disabled
          padding={16}
          style={{
            fontSize: 12,
            backgroundColor: "#1E1E1E",
            borderRadius: "16px",
            width: "100%",
            resize: "none",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <div
          onChange={() => false}
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
          contentEditable={false}
          style={{
            fontSize: 12,
            width: "100%",
            padding: "16px",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        >
          This code creates a Flutter app that loads an image from a URL and
          displays a progress indicator while the image is being loaded. <br />
          <br /> You can customize the appearance and behavior of the image
          according to your needs. <br />
          <br /> If you want to fetch the image and use it in Dart code instead
          of displaying it in a UI widget, you can use the{" "}
          <span className="font-bold">http</span> library to make an HTTP
          request and load the image in an appropriate format (e.g.,{" "}
          <span className="font-bold">Uint8List</span>). <br /> <br />
          For example, to fetch an image and store it in a{" "}
          <span className="font-bold">Uint8List</span> variable, you can do the
          following:
        </div>
        <CodeEditor
          value={imageHttp}
          language="dart"
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
          contentEditable={false}
          disabled
          padding={16}
          style={{
            fontSize: 12,
            backgroundColor: "#1E1E1E",
            borderRadius: "16px",
            width: "100%",
            resize: "none",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <div
          onChange={() => false}
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
          contentEditable={false}
          style={{
            fontSize: 12,
            width: "100%",
            padding: "16px",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        >
          This code downloads the image from the specified URL and stores its
          binary data in imageBytes. You can use imageBytes as needed, such as
          saving it locally or processing it in some way.
        </div>
        <img className="rounded-[16px] p-2 mx-auto" src={responseModel.Enlace} />
      </div>
    );
  }
  return (
    <>
      <LineSeparator />
      <div className="min-w-[560px] gap-4 max-w-[560px] flex flex-col h-full">
        <div className="flex items-center">
          <ConvertModal />
          <input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full input-text"
            placeholder="Enter classname"
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
          value={convert}
          onChange={() => false}
          language="dart"
          data-color-mode="dark"
          placeholder="Please enter Classname for generate Dart code."
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
    </>
  );
};

export default ConvertSection;
