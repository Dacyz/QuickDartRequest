"use client";
import React, { useState } from "react";
import Title from "../labels/title";
import Material from "../buttons/material";
import HttpRequest from "./http-request";
import SocketRequest from "./socket-request";
import ConvertSection from "./convert-request";
import {
  ConvertRequestIcon,
  HttpRequestIcon,
  SocketRequestIcon,
} from "../icons/icon";
import SaveRequestButton from "../buttons/save-request";
import NameRequestField from "../inputs/name-request";
import FreeSoloCreateOption from "../inputs/select-tag";
import LineSeparator from "../other/line-separator";

type module = {
  id: number;
  name: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};

const modules: module[] = [
  {
    id: 1,
    name: "Http Request",
    component: (
      <div className="flex h-[90%] gap-4 flex-grow">
        <HttpRequest />
        <LineSeparator />
        <ConvertSection />
      </div>
    ),
    icon: <HttpRequestIcon />,
  },
  {
    id: 2,
    name: "Convert Request",
    component: <ConvertSection />,
    icon: <ConvertRequestIcon />,
  },
  {
    id: 3,
    name: "Socket Request",
    component: <SocketRequest />,
    icon: <SocketRequestIcon />,
  },
];

const QueryPage: React.FC = () => {
  const [mode, setMode] = useState<module>(modules[0]);
  return (
    <div className="flex flex-col flex-grow p-4 gap-4 overflow-hidden">
      <div className="flex justify-between">
        <div className="flex">
          {modules.map((item) => (
            <Material
              key={item.id}
              className={`transition-opacity ${
                modules[0] == item
                  ? "rounded-l-[24px]"
                  : modules[2] == item
                  ? "rounded-r-[24px]"
                  : ""
              } ${mode == item ? "opacity-100" : "opacity-50"}`}
              onClick={() => {
                setMode(item);
              }}
            >
              {item.icon}
            </Material>
          ))}
          <Title className="ml-2" text={mode.name} />
        </div>
        <div className="flex">
          <NameRequestField />
          <FreeSoloCreateOption />
          <SaveRequestButton />
        </div>
      </div>
      {mode.component}
    </div>
  );
};

export default QueryPage;
