import RequestModel from "@/data/models/request_model";
import { allowedMethods } from "./string_extension";
import { regex } from "./validation_extension";
import { generateRandomId } from "./number_extension";
import { ParameterRow } from "@/data/models/parameter";
import ResponseModel from "@/data/models/response_model";

function getProperties(
  value?: string,
  method?: string
): RequestModel | undefined {
  if (value == null) return undefined;
  if (!regex.test(value)) return undefined;
  method = method?.toLowerCase();
  if (method && allowedMethods.includes(method)) {
    return getRequest(value, allowedMethods.indexOf(method));
  }
  return getRequest(value);
}

function getRequest(value?: string, method?: number): RequestModel | undefined {
  if (!value) return undefined;
  if (!regex.test(value)) return undefined;
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
        method,
        partes[0],
        `${queryString}`,
        newRows,
        undefined
      );
      console.log(newValue);
      return newValue;
    }
  } catch (error) {
    console.log(error);
    return;
  }
  const newValue = new RequestModel(method ?? 0, input);
  return newValue;
}

const callInternalEndpoint = async (
  requestModel: RequestModel
): Promise<ResponseModel | undefined> => {
  const method = requestModel.method.name;
  const url = new URL(requestModel.url);
  if (!requestModel.esEnlaceValido())
    throw new Error(`${requestModel.url} has no petition format`);
  const resp = await fetch("/api", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      url: url,
      method: method,
      body: requestModel.bodyContent,
    }),
  });
  console.log(requestModel.bodyContent);
  const gatito = await resp.json();

  if (gatito.status !== 200) throw gatito.data;
  const item: ResponseModel = {
    Name: url,
    Enlace: requestModel.url,
    contentType: gatito.contentType,
    jsonResponse: gatito.data,
    TimeStamp: Date.now(),
  };
  return item;
};

export { getProperties, getRequest, callInternalEndpoint };
