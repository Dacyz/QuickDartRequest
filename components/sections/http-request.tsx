"use client";
import React, { useState } from "react";
import { useDashboardContext } from "../../app/dashboard-context";
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

function getContentType(content: string): number {
  if (content && content.includes("application/json")) {
    // Si el Content-Type es JSON, muestra un mensaje en la consola
    return 1;
  } else if (content.includes("image/")) {
    return 2;
  }
  return 0;
}

function requestFrom(
  value?: string,
  method?: number
): RequestModel | undefined {
  if (!value) return undefined;
  if (typeof value !== "string") return undefined;
  const input: string = value;
  const unit = input.includes("?") ?? false;
  try {
    if (unit) {
      const partes: string[] = input.split("?");
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
      const newValue = new RequestModel(
        partes[0],
        `${queryString}`,
        newRows,
        undefined,
        method
      );
      console.log(newValue);
      return newValue;
    }
  } catch (error) {
    console.log(error);
    return;
  }
  const newValue = new RequestModel(input);
  console.log(newValue);
  return new RequestModel();
}

const HttpRequest: React.FC<QueryParameters> = ({ query, method }) => {
  const { updateLocalStorage } = useDashboardContext();
  const [inputValue, setInputValue] = useState<RequestModel>(
    requestFrom(query, method) ?? new RequestModel()
  );
  const [isMode, setMode] = useState(modes[0]);
  const [isAuthMode, setAuthMode] = useState(authModes[0]);
  const [responseValue, setResponseValue] = useState<ListItem | null>(null);
  const handleClick = async () => {
    try {
      if (inputValue.esEnlaceValido()) {
        const url = new URL(inputValue.url);
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
        const item: ListItem = {
          Name: url.host,
          Description: "",
          Method: 0,
          Enlace: inputValue.url,
          Response: resp,
          Tipo: res,
          jsonResponse: json,
          Group: "",
          TimeStamp: Date.now(),
        };
        updateLocalStorage(item); // Actualiza el localStorage con los datos obtenidos
        setResponseValue(item); // Actualiza el estado con los datos obtenidos
      } else {
        console.error("Invalid url:", inputValue);
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
        setInputValue(newValue); // Actualiza el estado con el valor del input
        return;
      }
    } catch (error) {
      const newValue = new RequestModel(input);
      setInputValue(newValue); // Actualiza el estado con el valor del input
      console.log(error, newValue);
      return;
    }
    const newValue = new RequestModel(input);
    console.log(newValue);
    setInputValue(newValue); // Actualiza el estado con el valor del input
  };

  return (
    <div className="flex h-[95%]">
      <div className="w-full flex flex-col mr-[16px]">
        <div className="flex items-center mb-[16px]">
          <DropDownBox
            onChange={(e) => setInputValue(inputValue.copyWith({ method: e }))}
          />
          <input
            className="w-full input-text"
            placeholder="Enter URL or paste text"
            aria-controls=":rq:"
            aria-labelledby=":rr:"
            type="text"
            value={inputValue.url}
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
              rows={inputValue.params}
              addRow={() => {
                setInputValue(
                  inputValue.copyWith({
                    params: [
                      ...inputValue.params,
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
                const newRows = inputValue.params.filter(
                  (row) => row.id !== id
                );
                setInputValue(
                  inputValue.copyWith({
                    params: newRows,
                    query: `${inputValue.toQuery(newRows)}`,
                  })
                );
              }}
              setRows={(rows) => {
                setInputValue(
                  inputValue.copyWith({
                    params: rows,
                    query: `${inputValue.toQuery(rows)}`,
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
              rows={inputValue.headers}
              addRow={() => {
                setInputValue(
                  inputValue.copyWith({
                    headers: [
                      ...inputValue.headers,
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
                const newRows = inputValue.headers.filter(
                  (row) => row.id !== id
                );
                setInputValue(
                  inputValue.copyWith({
                    headers: newRows,
                  })
                );
              }}
              setRows={(rows) => {
                setInputValue(
                  inputValue.copyWith({
                    headers: rows,
                  })
                );
              }}
            />
          ) : (
            <>Modulo de {isMode} en desarrollo</>
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
