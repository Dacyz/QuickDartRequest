"use client";
import React, { useState } from "react";
import { Title } from "../../../components/labels/title";
import Material from "../../../components/buttons/material";
import SaveRequestButton from "../../../components/buttons/save-request";
import NameRequestField from "../../../components/inputs/name-request";
import CategoriesModal from "../../../components/modals/categories-modal";
import Select from "../../../components/inputs/select";
import { useDashboardContext } from "@/data/context/context";
import { modules } from "@/data/models/module_model";

const QueryRequest: React.FC = () => {
  const { categoriesData, setRequestCategory, requestModel, setRequestModel } =
    useDashboardContext();
  const options = categoriesData.map((e) => e.title);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const setMode = (value: number) => {
    setRequestModel(requestModel.copyWith({ module: value }));
  };
  return (
    <div className="flex flex-col flex-grow p-4 gap-4 overflow-hidden bg-[#131212]">
      <div className="flex justify-between">
        <div className="flex">
          {modules.map((item) => (
            <Material
              key={item.id}
              className={`transition-opacity ${
                modules[0] == item ? "rounded-l-[24px]" : "rounded-r-[24px]"
              } ${
                requestModel.module == item.id ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => {
                setMode(item.id);
              }}
            >
              {item.icon}
            </Material>
          ))}
          <Title className="ml-2" text={modules[requestModel.module].name} />
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
      <div className="flex h-[90%] gap-4 flex-grow">
        {modules[requestModel.module].component}
      </div>
    </div>
  );
};

export default QueryRequest;
