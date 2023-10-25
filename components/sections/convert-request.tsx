"use client";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React from "react";
import { ConvertModal } from "../modals/categoriesmodal";

const ConvertSection: React.FC = () => {
  return (
    <div className="min-w-[560px] gap-4 max-w-[560px] flex flex-col h-full">
      <div className="flex items-center">
        <ConvertModal />
        <input
          className="w-full input-text"
          placeholder="Enter classname"
          aria-controls=":rq:"
          aria-labelledby=":rr:"
          type="text"
        ></input>
        <button className="button flex rounded-r-2xl">Convert</button>
      </div>
      <ul>
        <li>
          <input type="checkbox" id="toJson" name="toJson" value="Bike" />
          <label htmlFor="toJson">
            {" "}
            Generate <span className="text-blue-400">toJson</span> method
          </label>
        </li>
        <li>
          <input type="checkbox" id="copyWith" name="copyWith" value="Bike" />
          <label htmlFor="copyWith">
            {" "}
            Generate <span className="text-blue-400">copyWith</span> method
          </label>
        </li>
        <li>
          <input type="checkbox" id="toString" name="toString" value="Bike" />
          <label htmlFor="toString">
            {" "}
            Generate <span className="text-blue-400">toString</span> method
          </label>
        </li>
      </ul>
      <CodeEditor
        value={`import '../../domain/models/config/n_config_model.dart';

class ApiConstants {
  ///Constant
  static const int timeOutSeconds = 75;

  /// Ambientes:
  /// - CELER: "https://10.10.1.114:8080"
  /// - DEV: "https://x.spiralia-team.com"
  static const String NBaseServer = "https://x.aplicacion-team.com";
  static late final NConfigModel config;

  static Uri toUri(String path) => Uri.parse(config.toApi(path));

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
      <button className="button w-full rounded-2xl">
        {" "}
        <CopyAllIcon /> Copy
      </button>
    </div>
  );
};

export default ConvertSection;
