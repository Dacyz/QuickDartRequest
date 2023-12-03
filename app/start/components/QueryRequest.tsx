"use client";
import React, { useState } from "react";
import { Title } from "../../../components/labels/title";
import Material from "../../../components/buttons/material";
import HttpRequest from "../../../components/sections/http-request";
import ConvertSection from "../../../components/other/convert-section";
import {
  ConvertRequestIcon,
  HttpRequestIcon,
} from "../../../utils/icons/icon";
import SaveRequestButton from "../../../components/buttons/save-request";
import NameRequestField from "../../../components/inputs/name-request";
import CategoriesModal from "../../../components/modals/categories-modal";
import ConvertRequest from "../../../components/sections/convert-request";
import Select from "../../../components/inputs/select";
import { useDashboardContext } from "@/data/context/context";

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
      <>
        <HttpRequest />
        <ConvertSection />
      </>
    ),
    icon: <HttpRequestIcon />,
  },
  {
    id: 2,
    name: "Convert Request",
    component: <ConvertRequest />,
    icon: <ConvertRequestIcon />,
  },
  // {
  //   id: 3,
  //   name: "Socket Request",
  //   component: <SocketRequest />,
  //   icon: <SocketRequestIcon />,
  // },
];

const QueryRequest: React.FC = () => {
  const [mode, setMode] = useState<module>(modules[0]);
  const { categoriesData, setRequestCategory } = useDashboardContext();
  const options = categoriesData.map((e) => e.title);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div className="flex flex-col flex-grow p-4 gap-4 overflow-hidden bg-[#131212]">
      <div className="flex justify-between">
        <div className="flex">
          {modules.map((item) => (
            <Material
              key={item.id}
              className={`transition-opacity ${
                modules[0] == item ? "rounded-l-[24px]" : "rounded-r-[24px]"
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
          {options.length === 0 ? (
            <></>
          ) : (
            <Select
              options={options}
              value={selectedOption}
              onChange={(e) => {
                setRequestCategory(e);
                setSelectedOption(e);
              }}
            />
          )}
          <CategoriesModal />
          <SaveRequestButton />
        </div>
      </div>
      <div className="flex h-[90%] gap-4 flex-grow">{mode.component}</div>
    </div>
  );
};

export default QueryRequest;
