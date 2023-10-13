import { options } from "../data/methods";
import { generateRandomId } from "../helpers/number_extension";
import { MethodClass } from "./method-model";
import { ParameterRow, HeaderRow } from "./parameter";

interface RequestInterface {
  host: string | "";
  query: string | "";
  include: boolean;
  method: MethodClass;
  params: ParameterRow[];
  headers: HeaderRow[];
}

const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const defaultHeaders: HeaderRow[] = [
  {
    id: 0,
    estado: true,
    key: "Cache-Control",
    value: "no-cache",
    hidden: true,
  },
  {
    id: 1,
    estado: true,
    key: "Postman-Token",
    value: "<calculated when request is sent>",
    hidden: true,
  },
  {
    id: 2,
    estado: true,
    key: "Content-Length",
    value: "0",
    hidden: true,
  },
  {
    id: 3,
    estado: true,
    key: "Host",
    value: "<calculated when request is sent>",
    hidden: true,
  },
  {
    id: 4,
    estado: true,
    key: "User-Agent",
    value: "QuickRequest/0.32.1",
    hidden: true,
  },
  {
    id: 5,
    estado: true,
    key: "Accept",
    value: "*/*",
    hidden: true,
  },
  {
    id: 6,
    estado: true,
    key: "Accept-Encoding",
    value: "gzip, deflate, br",
    hidden: true,
  },
  {
    id: 7,
    estado: true,
    key: "Connection",
    value: "keep-alive",
    hidden: true,
  },
  {
    id: 8,
    estado: true,
    key: "",
    value: "",
    hidden: false,
  },
];
const defaultParameters: ParameterRow[] = [
  { id: generateRandomId(), estado: true, key: "", value: "" },
];

class RequestModel implements RequestInterface {
  // Expresión regular para verificar si el string es una URL válida
  // Propiedades de la clase
  public host: string;
  public query: string;
  public method: MethodClass;
  public include: boolean;
  public params: ParameterRow[];
  public headers: HeaderRow[];

  // Constructor de la clase
  constructor(
    host?: string,
    query?: string,
    params?: ParameterRow[],
    headers?: HeaderRow[],
    method?: number
  ) {
    this.host = host ?? ""; // Asignamos parametro1 a uri
    this.include = false;
    this.query = query ?? ""; // Asignamos parametro2 a query
    if (!method) {
      this.method = options[0]; // Asignamos parametro
    } else {
      this.method = options[method]; // Asignamos parametro
    }
    this.params = params ?? defaultParameters;
    this.headers = headers ?? defaultHeaders;
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
  esEnlaceValido(wa?: string): boolean {
    // Usamos test() para verificar si el texto coincide con la expresión regular
    return regex.test(wa ?? this.url);
  }

  toString(): string {
    return `${this.method.name} | ${this.include} | ${this.query}`;
  }

  copyWith(changes: Partial<RequestModel>): RequestModel {
    // Creamos una nueva instancia de RequestModel y copiamos las propiedades originales
    const copiedRequest = new RequestModel("");
    copiedRequest.host = this.host;
    copiedRequest.query = this.query;
    copiedRequest.method = this.method;
    copiedRequest.include = this.include;
    copiedRequest.params = this.params;
    copiedRequest.headers = this.headers;

    // Aplicamos los cambios proporcionados en el objeto `changes`
    if (changes.query !== undefined) {
      copiedRequest.query = changes.query;
    }
    if (changes.method !== undefined) {
      copiedRequest.method = changes.method;
    }
    if (changes.include !== undefined) {
      copiedRequest.include = changes.include;
    }
    if (changes.params !== undefined) {
      copiedRequest.params = changes.params;
    }
    if (changes.host !== undefined) {
      copiedRequest.host = changes.host;
    }
    if (changes.headers !== undefined) {
      copiedRequest.headers = changes.headers;
    }

    return copiedRequest;
  }
}

export default RequestModel; // Exporta la clase directamente
