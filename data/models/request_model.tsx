import { defaultHeaders, defaultParameters } from "../data/default";
import { options } from "../data/methods";
import { regex } from "../../utils/helpers/validation_extension";
import { MethodClass } from "./method-model";
import { ParameterRow, HeaderRow } from "./parameter";

interface RequestInterface {
  name: string;
  host: string | "";
  query: string | "";
  mode: string | "Params";
  include: boolean;
  timeStamp: number;
  group?: string;
  method: MethodClass;
  params: ParameterRow[];
  headers: HeaderRow[];
}

class RequestModel implements RequestInterface {
  public name: string;
  public host: string;
  public query: string;
  public mode: string;
  public timeStamp: number;
  public group?: string;
  public method: MethodClass;
  public include: boolean;
  public params: ParameterRow[];
  public headers: HeaderRow[];

  constructor(
    method?: number,
    host?: string,
    query?: string,
    params?: ParameterRow[],
    headers?: HeaderRow[],
    timeStamp?: number,
    group?: string,
    name?: string,
    mode?: string
  ) {
    this.host = host ?? "";
    this.include = false;
    this.query = query ?? "";
    if (!method) this.method = options[0];
    else this.method = options[method];
    this.params = params ?? defaultParameters;
    this.headers = headers ?? defaultHeaders;
    this.timeStamp = timeStamp ?? 0;
    this.group = group;
    this.mode = mode ?? "Params";
    this.name = name ?? "New request";
  }

  get url(): string {
    return `${this.host}${this.query}`;
  }

  get queries(): string {
    if (this.include) return "?";
    return "";
  }

  // Función para convertir la lista en query parameters
  get query_params(): string {
    const queryParams = this.params
      .filter((row) => row.estado !== false)
      .map((row) => {
        if (row.key.trim() !== "" && row.value.trim() !== "")
          return `${row.key}=${row.value}`;
        else if (row.key.trim() !== "" && row.value.trim() === "")
          return `${row.key}`;
        else if (row.key.trim() === "" && row.value.trim() !== "")
          return `${row.value}`;
      });
    return `${this.queries}${queryParams.join("&")}`;
  }

  // Función para convertir la lista en query parameters
  toQuery(value: ParameterRow[]): string {
    const queryParams = value
      .filter(
        (row) =>
          row.estado !== false &&
          (row.key.trim() !== "" || row.value.trim() !== "")
      )
      .map((row) => `${row.key}=${row.value}`);
    console.log(queryParams.length);
    return `${queryParams.length !== 0 ? "?" : ""}${queryParams.join("&")}`;
  }

  // Función (método) de la clase
  // Usamos test() para verificar si el texto coincide con la expresión regular
  esEnlaceValido = (wa?: string): boolean => regex.test(wa ?? this.url);

  toString = (): string => `[${this.method.name}]${this.include} ${this.query}`;

  copyWith(changes: Partial<RequestModel>): RequestModel {
    // Creamos una nueva instancia de RequestModel y copiamos las propiedades originales
    const copiedRequest = new RequestModel();
    copiedRequest.host = this.host;
    copiedRequest.query = this.query;
    copiedRequest.method = this.method;
    copiedRequest.include = this.include;
    copiedRequest.params = this.params;
    copiedRequest.headers = this.headers;
    copiedRequest.timeStamp = this.timeStamp;
    copiedRequest.group = this.group;
    copiedRequest.name = this.name;
    copiedRequest.mode = this.mode;

    // Aplicamos los cambios proporcionados en el objeto `changes`
    if (changes.host !== undefined) copiedRequest.host = changes.host;
    if (changes.query !== undefined) copiedRequest.query = changes.query;
    if (changes.method !== undefined) copiedRequest.method = changes.method;
    if (changes.include !== undefined) copiedRequest.include = changes.include;
    if (changes.params !== undefined) copiedRequest.params = changes.params;
    if (changes.headers !== undefined) copiedRequest.headers = changes.headers;
    if (changes.timeStamp !== undefined)
      copiedRequest.timeStamp = changes.timeStamp;
    if (changes.group !== undefined) copiedRequest.group = changes.group;
    if (changes.name !== undefined) copiedRequest.name = changes.name;
    if (changes.mode !== undefined) copiedRequest.mode = changes.mode;

    return copiedRequest;
  }
}

export default RequestModel;
