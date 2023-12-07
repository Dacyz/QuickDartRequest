"use client";
import React, { useState } from "react";
import { useDashboardContext } from "../../../../data/context/context";
import { Title } from "../../../../components/labels/title";
import ViewResponse from "../../../../components/other/view-response";
import {
  HeaderTable,
  ParamsTable,
} from "../../../../components/other/params-table";
import DropDownMethodBox from "../../../../components/buttons/dropdown";
import ButtonGroup from "../../../../components/buttons/button-group";
import { generateRandomId } from "@/utils/helpers/number_extension";
import { authModes, bodyModes, modes } from "@/data/data/modes";
import HostRequestField from "../../../../components/inputs/host-request";
import { toast } from "sonner";
import { callInternalEndpoint } from "@/utils/helpers/request_extension";

const HttpRequest: React.FC = () => {
  const { setRequestModel, requestModel, setResponseModel, responseModel } =
    useDashboardContext();
  const [isAuthMode, setAuthMode] = useState(authModes[0]);
  const [isBodyMode, setBodyMode] = useState(bodyModes[0]);
  const [asd, setAsd] = useState(false);

  const handleClickGenerate = async () => {
    toast.promise(callInternalEndpoint(requestModel), {
      loading: "Loading...",
      success: async (resp) => {
        if (resp) {
          setResponseModel(resp); // Actualiza el estado con los datos obtenidos
          return "Endpoint fetched";
        }
      },
      error: (e) => {
        return `Error generating the petition ${requestModel.url}: ${e}`;
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-4 flex-grow">
      <div className="flex items-center">
        <DropDownMethodBox />
        <HostRequestField />
        <button
          className="button rounded-r-[16px]"
          onClick={handleClickGenerate}
        >
          Send
        </button>
      </div>
      <div className="flex justify-between">
        <Title className="ml-2" text={requestModel.mode} />
        <ButtonGroup
          value={requestModel.mode}
          items={modes}
          onChange={(mode) => {
            const newValue = requestModel.copyWith({ mode: mode });
            setRequestModel(newValue); // Actualiza el estado con el valor del input
          }}
        />
      </div>
      <div className="bg-[#1e1e1e73] flex-grow-[2] flex-shrink-[2] overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded">
        {requestModel.mode === modes[0] ? (
          <ParamsTable
            rows={requestModel.params}
            addRow={() => {
              setRequestModel(
                requestModel.copyWith({
                  params: [
                    ...requestModel.params,
                    {
                      id: generateRandomId(),
                      estado: true,
                      key: "",
                      value: "",
                    },
                  ],
                })
              );
            }}
            deleteRow={(id: number) => {
              const newRows = requestModel.params.filter(
                (row) => row.id !== id
              );
              setRequestModel(
                requestModel.copyWith({
                  params: newRows,
                  query: `${requestModel.toQuery(newRows)}`,
                })
              );
            }}
            setRows={(rows) => {
              setRequestModel(
                requestModel.copyWith({
                  params: rows,
                  query: `${requestModel.toQuery(rows)}`,
                })
              );
            }}
          />
        ) : requestModel.mode === modes[1] ? (
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <ButtonGroup
                value={isAuthMode}
                items={authModes}
                onChange={(mode) => {
                  setAuthMode(mode);
                }}
              />
              {authModes[1] === isAuthMode ? (
                <ButtonGroup
                  value={asd ? "Headers" : "Query Params"}
                  items={["Headers", "Query Params"]}
                  onChange={(mode) => {
                    setAsd(!asd);
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="">
              {authModes[0] === isAuthMode ? (
                "This request does not use any authorization"
              ) : authModes[1] === isAuthMode ? (
                <ul className="flex flex-col w-full gap-3">
                  <li className="flex items-center gap-3">
                    Key{" "}
                    <input
                      className="w-full input-text rounded-2xl"
                      placeholder="Enter key or paste text"
                      aria-controls=":rq:"
                      aria-labelledby=":rr:"
                      type="text"
                    />
                  </li>
                  <li className="flex items-center gap-3">
                    Value{" "}
                    <input
                      className="w-full input-text rounded-2xl"
                      placeholder="Enter value or paste text"
                      aria-controls=":rq:"
                      aria-labelledby=":rr:"
                      type="text"
                    />
                  </li>
                </ul>
              ) : (
                <>{isAuthMode}</>
              )}
            </div>
          </div>
        ) : requestModel.mode === modes[2] ? (
          <HeaderTable
            rows={requestModel.headers}
            addRow={() => {
              setRequestModel(
                requestModel.copyWith({
                  headers: [
                    ...requestModel.headers,
                    {
                      id: generateRandomId(),
                      estado: true,
                      key: "",
                      value: "",
                      hidden: true,
                    },
                  ],
                })
              );
            }}
            deleteRow={(id: number) => {
              const newRows = requestModel.headers.filter(
                (row) => row.id !== id
              );
              setRequestModel(
                requestModel.copyWith({
                  headers: newRows,
                })
              );
            }}
            setRows={(rows) => {
              setRequestModel(
                requestModel.copyWith({
                  headers: rows,
                })
              );
            }}
          />
        ) : (
          <div className="p-4">
            <ButtonGroup
              className="mb-[16px]"
              value={isBodyMode}
              items={bodyModes}
              onChange={(mode) => {
                setBodyMode(mode);
              }}
            />
            <div className="">
              {bodyModes[0] === isBodyMode ? (
                "This request does not have a body"
              ) : bodyModes[1] === isBodyMode ? (
                <ParamsTable
                  rows={requestModel.params}
                  addRow={() => {}}
                  deleteRow={(id: number) => {}}
                  setRows={(rows) => {}}
                />
              ) : (
                <>{isBodyMode}</>
              )}
            </div>
          </div>
        )}
      </div>
      <Title className="ml-2" text="Response" />
      <ViewResponse item={responseModel} />
    </div>
  );
};

export default HttpRequest;
