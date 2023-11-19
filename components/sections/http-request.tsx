"use client";
import React, { useState } from "react";
import { useDashboardContext } from "../../context/context";
import { Title } from "../labels/title";
import ViewResponse from "../other/view-response";
import { HeaderTable, ParamsTable } from "../other/params-table";
import DropDownMethodBox from "../buttons/dropdown";
import ButtonGroup from "../buttons/button-group";
import { generateRandomId } from "@/data/helpers/number_extension";
import { authModes, bodyModes, modes } from "@/data/data/modes";
import HostRequestField from "../inputs/host-request";
import { toast } from "sonner";
import { getContentType } from "@/data/helpers/validation_extension";

const HttpRequest: React.FC = () => {
  const { setRequestModel, requestModel, setResponseModel, responseModel } =
    useDashboardContext();
  const [isAuthMode, setAuthMode] = useState(authModes[0]);
  const [isBodyMode, setBodyMode] = useState(bodyModes[0]);

  const handleClickGenerate = async () => {
    try {
      const url = new URL(requestModel.url);
      if (!requestModel.esEnlaceValido()) {
        toast.error(`${requestModel.url} has no petition format`);
        console.error("Invalid url:", requestModel);
        return;
      }
      toast.promise(fetch(url, { method: requestModel.method.name }), {
        loading: "Loading...",
        success: async (resp) => {
          try {
            const contentTypeHeader = resp.headers.get("Content-Type") ?? "*/*";
            let res: number = getContentType(contentTypeHeader);
            console.log(res);
            let json: object | null | string;
            json =
              res === 1
                ? await resp.json()
                : res === 4
                ? await resp.text()
                : null;
            const item: ResponseModel = {
              Name: url,
              Enlace: requestModel.url,
              Response: resp,
              jsonResponse: json,
              TimeStamp: Date.now(),
            };
            console.log(item);
            setResponseModel(item); // Actualiza el estado con los datos obtenidos
            return `${url} has been fetched`;
          } catch (error) {
            toast.error(`${url} has some problems`);
          }
        },
        error: `Error generating the petition ${requestModel.url}`,
      });
    } catch (error) {
      toast.error(`Error generating the petition  ${requestModel.url}`);
      console.error("Error al generar la petición", error);
    }
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
      <ViewResponse item={responseModel} />
    </div>
  );
};

export default HttpRequest;
