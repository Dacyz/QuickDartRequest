"use client";
import React, { useState } from "react";
import { useDashboardContext } from "../../context/context";
import Title from "../labels/title";
import ViewResponse from "../other/view-response";
import { HeaderTable, ParamsTable } from "../other/params-table";
import { ParameterRow } from "@/data/models/parameter";
import RequestModel from "@/data/models/request_model";
import DropDownMethodBox from "../buttons/dropdown";
import ButtonGroup from "../buttons/button-group";
import { generateRandomId } from "@/data/helpers/number_extension";
import { authModes, bodyModes, modes } from "@/data/data/modes";
import HostRequestField from "../inputs/host-request";

function getContentType(content: string): number {
  if (content.includes("application/json")) {
    return 1;
  } else if (content.includes("image/")) {
    return 2;
  }
  return 0;
}

const HttpRequest: React.FC = () => {
  const { setRequestModel, requestModel } = useDashboardContext();
  const [isAuthMode, setAuthMode] = useState(authModes[0]);
  const [isBodyMode, setBodyMode] = useState(bodyModes[0]);
  const [responseValue, setResponseValue] = useState<ResponseModel | null>(
    null
  );
  const handleClickGenerate = async () => {
    try {
      if (requestModel.esEnlaceValido()) {
        const url = new URL(requestModel.url);
        let resp = await fetch(url);
        const contentTypeHeader = resp.headers.get("Content-Type") ?? "*/*";
        let res: number = getContentType(contentTypeHeader);
        let json: object | null;
        if (res === 1) {
          json = await resp.json();
          console.log(json);
        } else {
          json = null;
        }
        const item: ResponseModel = {
          Name: url.host,
          Description: "",
          Method: 0,
          Enlace: requestModel.url,
          Response: resp,
          Tipo: res,
          jsonResponse: json,
          Group: "",
          TimeStamp: Date.now(),
        };
        setResponseValue(item); // Actualiza el estado con los datos obtenidos
      } else {
        console.error("Invalid url:", requestModel);
      }
    } catch (error) {
      console.error("Error al generar la petición", error);
    }
  };
  

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center">
        <DropDownMethodBox />
        <HostRequestField/>
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
      <div className="rounded-[16px] bg-[#1E1E1E] min-h-[25vh] max-h-[25vh] overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded">
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
          <div className="">
            <ButtonGroup
              className="mb-[16px]"
              value={isAuthMode}
              items={authModes}
              onChange={(mode) => {
                setAuthMode(mode);
              }}
            />
            {authModes[0] === isAuthMode ? (
              <div className="">
                This request does not use any authorization
              </div>
            ) : (
              <>{isAuthMode}</>
            )}
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
          <div className="">
            <ButtonGroup
              className="mb-[16px]"
              value={isBodyMode}
              items={bodyModes}
              onChange={(mode) => {
                setBodyMode(mode);
              }}
            />
            {bodyModes[0] === isBodyMode ? (
              <div className="">This request does not have a body</div>
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
        )}
      </div>
      <Title className="ml-2" text="Response" />
      <ViewResponse item={responseValue} />
    </div>
  );
};

export default HttpRequest;
