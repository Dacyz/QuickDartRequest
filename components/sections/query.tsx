"use client";
import React, { useState } from "react";
import Title from "../labels/title";
import Material from "../buttons/material";
import HttpRequest from "./http-request";
import SocketRequest from "./socket-request";
import ConvertRequest from "./convert-request";
import {
  ConvertRequestIcon,
  HttpRequestIcon,
  SocketRequestIcon,
} from "../icons/icon";

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
    component: <HttpRequest />,
    icon: <HttpRequestIcon />,
  },
  {
    id: 2,
    name: "Convert Request",
    component: <ConvertRequest />,
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
    <div className="flex flex-col flex-grow p-4">
      <div className="flex mb-[16px]">
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
      {mode.component}
    </div>
  );
};

export default QueryPage;
