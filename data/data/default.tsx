import { generateRandomId } from "../../utils/helpers/number_extension";
import { HeaderRow, ParameterRow } from "../models/parameter";

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

export { defaultHeaders, defaultParameters };

