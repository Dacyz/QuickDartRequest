/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";
import ConvertModal from "../modals/convert-modal";
import { useDashboardContext } from "@/data/context/context";
import LineSeparator from "../../utils/components/line-separator";
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from "quicktype-core";
import { toast } from "sonner";
import { CustomDartTargetLanguage } from "@/data/data/quicktype/custom_dart_renderer";
import ConfigConvert from "@/data/models/config_model";

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
  console.log(configModel);
  return await quicktype({
    inputData,
    lang: dartLang,
    allPropertiesOptional: configModel.propertiesNullable, // Nullsafety
  });
}

const ConvertSection: React.FC = () => {
  const { responseModel, userSettings, setResponseModel } =
    useDashboardContext();

  const handleClickGenerate = async () => {
    try {
      if (!responseModel?.classNameConvert) {
        return;
      }
      if (responseModel?.classNameConvert.length == 0) {
        toast.error("ClassName must to be not empty");
        return;
      }
      const { lines: swiftPerson } = await quicktypeJSON(
        "dart",
        responseModel?.classNameConvert,
        JSON.stringify(responseModel?.jsonResponse) ?? "",
        userSettings.configConvert
      );
      setResponseModel(
        responseModel.copyWith({ convertConvert: swiftPerson.join("\n") })
      );
    } catch (error: any) {
      toast.error(`${error.message}`);
      console.error(
        error,
        responseModel?.classNameConvert,
        responseModel?.jsonResponse?.toString()
      );
    }
  };

  if (responseModel.Enlace === "") {
    return <></>;
  }
  const type = responseModel.contentType;
  if (type === 2) {
    const imageWidget = `Image.network(
  // URL of your image
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

// Replaced with the URL of your image
final response = await http.get(Uri.parse('${responseModel.Enlace}'));
if (response.statusCode == 200) {
  final imageBytes = response.bodyBytes;
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
        <img
          className="rounded-[16px] p-2 mx-auto"
          src={responseModel.Enlace}
        />
      </div>
    );
  }
  if (type === 3) {
    const imageWidget = `dependencies:
  video_player: ^2.2.17`;
    const imageWidget2 = `dependencies:
  http: ^0.13.3`;
    const imageHttp = `late VideoPlayerController _controller;

@override
void initState() {
  super.initState();
  _controller = VideoPlayerController.network('${responseModel.Enlace}'); // Replaced with your actual video URL.
  _controller.initialize().then((_) => setState(() {}));
  _controller.setLooping(true); // Optional: Loop the video.
}

@override
void dispose() {
  super.dispose();
  _controller.dispose();
}

@override
Widget build(BuildContext context) {
  return Scaffold(
    ...
    body:_controller.value.isInitialized
      ? AspectRatio(
          aspectRatio: _controller.value.aspectRatio,
          child: VideoPlayer(_controller),
        )
      : CircularProgressIndicator(),
    floatingActionButton: FloatingActionButton(
      onPressed: () {
        setState(() {
          if (_controller.value.isPlaying) {
            _controller.pause();
          } else {
            _controller.play();
          }
        });
      },
      child: Icon(
        _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
      ),
    ),
  );
}`;
    const videoHttp = `import 'package:http/http.dart' as http;

// Replaced with the URL of your image
final response = await http.get(Uri.parse('${responseModel.Enlace}'));
if (response.statusCode == 200) {
  final videoBytes = response.bodyBytes;
}`;
    return (
      <div className="min-w-[640px] max-w-[640px] overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded ">
        <div
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
          To embed an internet video in Flutter, you can use the.
          <span className="font-bold">video_player</span> package <br /> <br />{" "}
          First, add it to your <span className="font-bold">pubspec.yaml</span>{" "}
          file:
        </div>
        <CodeEditor
          value={imageWidget}
          language="yaml"
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
          Run <span className="font-bold">flutter pub get</span> to install the
          dependency. Now, in your Dart file, import the{" "}
          <span className="font-bold">video_player</span> package and use the{" "}
          <span className="font-bold">VideoPlayerController</span>
          widget. <br /> <br />
          Here{"'"}s a basic example:
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
          If you want to make a GET request to a URL in Flutter, you can use the
          package <span className="font-bold">http</span>. Make sure to add the
          dependency in your file{" "}
          <span className="font-bold">pubspec.yaml</span>:
        </div>
        <CodeEditor
          value={imageWidget2}
          language="yaml"
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
          This code downloads the video from the specified URL and stores its
          binary data in videoBytes. You can use videoBytes as needed, such as
          saving it locally or processing it in some way.
        </div>
        <CodeEditor
          value={videoHttp}
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
            value={responseModel?.classNameConvert}
            onChange={(e) => {
              setResponseModel(
                responseModel.copyWith({ classNameConvert: e.target.value })
              );
            }}
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
          value={responseModel?.convertConvert}
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
