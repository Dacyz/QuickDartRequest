"use client";
import React, { useState } from "react";
import { useDashboardContext } from "../../context/context";
import Title from "../labels/title";
import ConvertRequest from "./convert-request";
import LineSeparator from "../other/line-separator";
import ViewResponse from "../other/view-response";
import { HeaderTable, ParamsTable } from "../other/params-table";
import { ParameterRow } from "@/data/models/parameter";
import RequestModel from "@/data/models/request_model";
import DropDownBox from "../buttons/dropdown";
import ButtonGroup from "../buttons/button-group";
import { generateRandomId } from "@/data/helpers/number_extension";

const modes = ["Params", "Authorization", "Headers", "Body"];
const authModes = [
  "No auth",
  "API Key",
  "Basic Auth",
  "Bearer Token",
  "OAuth 2.0",
]; // Falta "Inherit from parent" y "AWS Signature"
const bodyModes = [
  "None",
  "Form-data",
  "x-www-form-urlencoded",
  "Raw",
  "Binary",
]; // Falta "Inherit from parent" y "GraphQL"

function getContentType(content: string): number {
  if (content && content.includes("application/json")) {
    // Si el Content-Type es JSON, muestra un mensaje en la consola
    return 1;
  } else if (content.includes("image/")) {
    return 2;
  }
  return 0;
}

const HttpRequest: React.FC = () => {
  const { updateLocalStorage, setRequestModel, requestModel } =
    useDashboardContext();
  const [isMode, setMode] = useState(modes[0]);
  const [isAuthMode, setAuthMode] = useState(authModes[0]);
  const [isBodyMode, setBodyMode] = useState(bodyModes[0]);
  const [responseValue, setResponseValue] = useState<ResponseModel | null>(
    null
  );
  const handleClick = async () => {
    try {
      if (requestModel.esEnlaceValido()) {
        const url = new URL(requestModel.url);
        let resp = await fetch(url);
        console.log(resp);
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
        updateLocalStorage(item); // Actualiza el localStorage con los datos obtenidos
        setResponseValue(item); // Actualiza el estado con los datos obtenidos
      } else {
        console.error("Invalid url:", requestModel);
      }
    } catch (error) {}
  };
  const handleInputChange = (event: any) => {
    const input: string = event.target.value;
    const unit = input.includes("?");
    try {
      if (unit) {
        const partes: string[] = input.split("?"); // Dividir la cadena
        const queryString = input.substring(partes[0].length);
        const paramsString = input.substring(partes[0].length + 1);
        const parameters: string[] = paramsString.split("&");
        let newRows: ParameterRow[] = [];
        parameters.map((parameter) => {
          const values: string[] = parameter.split("=");
          newRows.push({
            id: generateRandomId(),
            estado: true,
            key: values[0] ?? "",
            value: values[1] ?? "",
          });
        });
        newRows.push({
          id: generateRandomId(),
          estado: true,
          key: "",
          value: "",
        });
        const newValue = new RequestModel(partes[0], `${queryString}`, newRows);
        console.log(newValue);
        setRequestModel(newValue); // Actualiza el estado con el valor del input
        return;
      }
    } catch (error) {
      const newValue = new RequestModel(input);
      setRequestModel(newValue); // Actualiza el estado con el valor del input
      console.log(error, newValue);
      return;
    }
    const newValue = new RequestModel(input);
    console.log(newValue);
    setRequestModel(newValue); // Actualiza el estado con el valor del input
  };

  return (
    <div className="flex h-[95%]">
      <div className="w-full flex flex-col mr-[16px]">
        <div className="flex items-center mb-[16px]">
          <DropDownBox
            onChange={(e) =>
              setRequestModel(requestModel.copyWith({ method: e }))
            }
          />
          <input
            className="w-full input-text"
            placeholder="Enter URL or paste text"
            aria-controls=":rq:"
            aria-labelledby=":rr:"
            type="text"
            value={requestModel.url}
            onChange={handleInputChange}
          ></input>
          <button className="button rounded-r-[16px]" onClick={handleClick}>
            Send
          </button>
        </div>

        <div className="flex justify-between">
          <Title className="m-2" text={isMode} />
          <ButtonGroup
            className="mb-[16px]"
            value={isMode}
            items={modes}
            onChange={(mode) => {
              setMode(mode);
            }}
          />
        </div>
        <div className="p-4 rounded-[16px] bg-[#1E1E1E] min-h-[25vh] max-h-[25vh] overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded">
          {isMode === modes[0] ? (
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
          ) : isMode === modes[1] ? (
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
          ) : isMode === modes[2] ? (
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
        <Title className="m-2" text="Response" />
        <ViewResponse item={responseValue} />
      </div>
      <LineSeparator />
      <div className="min-w-[320px] ml-[16px] max-w-[320px]">
        <ConvertRequest />
      </div>
    </div>
  );
};

export default HttpRequest;
