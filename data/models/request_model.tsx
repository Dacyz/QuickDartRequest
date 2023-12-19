import { defaultHeaders, defaultParameters } from "../data/default";
import { options } from "../data/methods";
import { regex } from "../../utils/helpers/validation_extension";
import { MethodClass } from "./method-model";
import { ParameterRow, HeaderRow } from "./parameter";

interface Body {
  mode: number;
  contentFormData: ParameterRow[];
  contentRaw: string;
  contentBinary: undefined;
}

function bodyCopyWith(body: Body, changes: Partial<Body>): Body {
  return {
    ...body,
    ...changes,
  };
}

class RequestModel {
  public name: string;
  public host: string;
  public query: string;
  public mode: string;
  public module: number;
  public timeStamp: number;
  public group?: string;
  public method: MethodClass;
  public params: ParameterRow[];
  public headers: HeaderRow[];
  public jsonObject: string;
  public nameObject: string;
  public body: Body;

  constructor(
    method?: number,
    host?: string,
    query?: string,
    params?: ParameterRow[],
    headers?: HeaderRow[],
    module?: number,
    timeStamp?: number,
    group?: string,
    name?: string,
    mode?: string,
    jsonObject?: string,
    nameObject?: string,
    body?: Body
  ) {
    this.host = host ?? "";
    this.query = query ?? "";
    this.module = module ?? 0;
    if (!method) this.method = options[0];
    else this.method = options[method];
    this.params = params ?? defaultParameters;
    this.headers = headers ?? defaultHeaders;
    this.timeStamp = timeStamp ?? 0;
    this.group = group;
    this.mode = mode ?? "Params";
    this.name = name ?? "New request";
    this.jsonObject = jsonObject ?? "";
    this.nameObject = nameObject ?? "";
    this.body = body ?? {
      mode: 0,
      contentFormData: defaultParameters,
      contentRaw: "",
      contentBinary: undefined,
    };
  }

  get bodyContent(): any {
    if (this.body.mode === 1) {
      return this.body.contentFormData;
    } else if (this.body.mode === 2) {
      return this.body.contentRaw;
    } else if (this.body.mode === 3) {
      return this.body.contentBinary;
    } else {
      return undefined;
    }
  }

  get url(): string {
    return `${this.host}${this.query}`;
  }

  // Función para convertir la lista en query parameters
  get query_params(): string {
    const queryParams = this.params
      .filter(
        (row) =>
          row.estado !== false &&
          (row.key.trim() !== "" || row.value.trim() !== "")
      )
      .map((row) => `${row.key}=${row.value}`);
    return `${queryParams.length !== 0 ? "?" : ""}${queryParams.join("&")}`;
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

  toString = (): string => `[${this.method.name}]${this.query}`;

  copyWith(changes: Partial<RequestModel>): RequestModel {
    // Creamos una nueva instancia de RequestModel y copiamos las propiedades originales
    const copiedRequest = new RequestModel();
    copiedRequest.host = this.host;
    copiedRequest.query = this.query;
    copiedRequest.method = this.method;
    copiedRequest.params = this.params;
    copiedRequest.headers = this.headers;
    copiedRequest.timeStamp = this.timeStamp;
    copiedRequest.group = this.group;
    copiedRequest.name = this.name;
    copiedRequest.mode = this.mode;
    copiedRequest.module = this.module;
    copiedRequest.jsonObject = this.jsonObject;
    copiedRequest.nameObject = this.nameObject;
    copiedRequest.body = this.body;

    // Aplicamos los cambios proporcionados en el objeto `changes`
    if (changes.host !== undefined) copiedRequest.host = changes.host;
    if (changes.query !== undefined) copiedRequest.query = changes.query;
    if (changes.method !== undefined) copiedRequest.method = changes.method;
    if (changes.params !== undefined) copiedRequest.params = changes.params;
    if (changes.headers !== undefined) copiedRequest.headers = changes.headers;
    if (changes.timeStamp !== undefined)
      copiedRequest.timeStamp = changes.timeStamp;
    if (changes.group !== undefined) copiedRequest.group = changes.group;
    if (changes.name !== undefined) copiedRequest.name = changes.name;
    if (changes.mode !== undefined) copiedRequest.mode = changes.mode;
    if (changes.module !== undefined) copiedRequest.module = changes.module;
    if (changes.body !== undefined) copiedRequest.body = changes.body;
    if (changes.jsonObject !== undefined)
      copiedRequest.jsonObject = changes.jsonObject;
    if (changes.nameObject !== undefined)
      copiedRequest.nameObject = changes.nameObject;

    return copiedRequest;
  }
}

export default RequestModel;
export { bodyCopyWith };
