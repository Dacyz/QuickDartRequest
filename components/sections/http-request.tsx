"use client";
import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import { useDashboardContext } from "../../app/dashboard-context";
import Title from "../labels/title";
import Material from "../buttons/material";
import {
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { MethodClass } from "../../data/models/method-model";
import { options } from "../../data/data/methods";
import ConvertRequest from "./convert-request";
import LineSeparator from "../other/line-separator";
import ViewResponse from "../other/view-response";

const modes = { 0: "Params", 1: "Authorization", 2: "Headers", 3: "Body" };
type Parameter = {
  id: number;
  studentId: string;
  name: string;
};

const defaultData: Parameter[] = [
  {
    id: 1,
    studentId: "",
    name: " ",
  },
];

const TableCell: React.FC<{
  getValue: () => number;
  row: { index: number };
  column: { id: string };
  table: Table<Parameter>;
}> = ({ getValue, row, column, table }) => {
  const [value, setValue] = useState<number | string | undefined>(undefined);

  const onBlur = () => {
    // table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="bg-transparent w-full border-none focus:border-gray-700 outline-none hover:border-gray-800 rounded-md text"
      onBlur={onBlur}
    />
  );
};

const columnHelper = createColumnHelper<Parameter>();

const columns = [
  columnHelper.accessor("id", {
    header: " ",
    cell: (row) => <div className="flex items-center justify-center"> </div>,
  }),
  columnHelper.accessor("id", {
    header: "Key",
    cell(props) {
      return (
        <TableCell
          getValue={props.getValue}
          column={props.column}
          row={props.row}
          table={props.table}
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    header: "Value",
    cell(props) {
      return (
        <TableCell
          getValue={props.getValue}
          column={props.column}
          row={props.row}
          table={props.table}
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    header: " ",
    cell: (row) => (
      <div className="flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="19"
          className="cursor-pointer"
          viewBox="0 0 13 16"
          fill="none"
          onClick={() => {
            console.log(row.cell.id);
          }}
        >
          <path
            d="M10.875 14H4V4.66667H10.875M10.875 3.33334H4C3.66848 3.33334 3.35054 3.47381 3.11612 3.72386C2.8817 3.97391 2.75 4.31305 2.75 4.66667V14C2.75 14.3536 2.8817 14.6928 3.11612 14.9428C3.35054 15.1929 3.66848 15.3333 4 15.3333H10.875C11.2065 15.3333 11.5245 15.1929 11.7589 14.9428C11.9933 14.6928 12.125 14.3536 12.125 14V4.66667C12.125 4.31305 11.9933 3.97391 11.7589 3.72386C11.5245 3.47381 11.2065 3.33334 10.875 3.33334ZM9 0.666672H1.5C1.16848 0.666672 0.850537 0.807148 0.616116 1.0572C0.381696 1.30724 0.25 1.64638 0.25 2.00001V11.3333H1.5V2.00001H9V0.666672Z"
            fill="white"
          />
        </svg>
        {row.getValue() != 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="19"
            className="ml-2 cursor-pointer"
            viewBox="0 0 17 19"
            fill="none"
          >
            <path
              d="M5.17508 0.42981V1.42981H0.175079V3.42981H1.17508V16.4298C1.17508 16.9602 1.38579 17.469 1.76087 17.844C2.13594 18.2191 2.64465 18.4298 3.17508 18.4298H13.1751C13.7055 18.4298 14.2142 18.2191 14.5893 17.844C14.9644 17.469 15.1751 16.9602 15.1751 16.4298V3.42981H16.1751V1.42981H11.1751V0.42981H5.17508ZM3.17508 3.42981H13.1751V16.4298H3.17508V3.42981ZM5.17508 5.42981V14.4298H7.17508V5.42981H5.17508ZM9.17508 5.42981V14.4298H11.1751V5.42981H9.17508Z"
              fill="white"
            />
          </svg>
        ) : (
          <></>
        )}
      </div>
    ),
  }),
];

function esEnlaceValido(texto: string): boolean {
  // Expresión regular para verificar si el string es una URL válida
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  // Usamos test() para verificar si el texto coincide con la expresión regular
  return regex.test(texto);
}

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
  const { localData, updateLocalStorage } = useDashboardContext();
  const handleClick = async () => {
    try {
      if (esEnlaceValido(inputValue)) {
        const url = new URL(inputValue);
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
          Method: selectedOption?.id,
          Enlace: inputValue,
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
    setInputValue(event.target.value); // Actualiza el estado con el valor del input
  };
  const [inputValue, setInputValue] = useState("");
  const [isMode, setMode] = useState(modes[0]);
  const [isOpen, setOpen] = useState(false);
  const [responseValue, setResponseValue] = useState<ListItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<MethodClass>(options[0]);

  const colleagueIcon = (
    <Material
      className={`rounded-l-[24px] transition-opacity text-black ${
        isMode == modes[0] ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setMode(modes[0]);
      }}
    >
      {modes[0]}
    </Material>
  );
  const historyIcon = (
    <Material
      className={`transition-opacity text-black ${
        isMode === modes[1] ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setMode(modes[1]);
      }}
    >
      {modes[1]}
    </Material>
  );
  const historIcon = (
    <Material
      className={`transition-opacity text-black ${
        isMode === modes[2] ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setMode(modes[2]);
      }}
    >
      {modes[2]}
    </Material>
  );
  const histoIcon = (
    <Material
      className={`transition-opacity rounded-r-[24px] text-black ${
        isMode === modes[3] ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setMode(modes[3]);
      }}
    >
      {modes[3]}
    </Material>
  );

  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable<Parameter>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <div className="flex h-[95%]">
      <div className="w-full flex flex-col mr-[16px]">
        <div className="flex items-center mb-[16px]">
          <div
            className="relative min-w-[72px] text-center text-[12px] justify-center items-center flex-row flex cursor-pointer"
            style={{
              color: selectedOption?.color,
              backgroundColor: selectedOption?.backgroundColor,
              borderRadius: !isOpen ? "16px 0 0 16px" : "16px 0 0 0",
            }}
            onClick={() => setOpen(!isOpen)}
          >
            <p className="py-[11px] flex text-center items-center justify-center">
              {selectedOption?.name ?? "Select"}
            </p>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: [0.1, 1] }}
                  exit={{ y: -5, opacity: [0.5, 0] }}
                  transition={{ duration: 0.1 }}
                  onMouseLeave={() => setOpen(false)}
                  className="absolute top-[40px] w-[72px] bg-[#1E1E1E] rounded-b-2xl z-50"
                >
                  {options.map((e, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setOpen(false);
                        setSelectedOption(e);
                      }}
                      style={{
                        color: e.color,
                        backgroundColor: e.backgroundColor,
                        borderRadius:
                          i === options.length - 1 ? "0 0 16px 16px" : "",
                      }}
                      className="p-2 hover:font-semibold justify-between items-center cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <input
            className="w-full border-none bg-[#1E1E1E] p-2 text-base outline-none placeholder:text-[#FFFFFF78] placeholder:text-[12px] placeholder:font-normal text-[12px]"
            placeholder="Enter URL or paste text"
            aria-expanded="true"
            aria-controls=":rq:"
            aria-labelledby=":rr:"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <button
            className="top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-[16px] focus:outline-none"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
        <div className="flex justify-between">
          <Title className="m-2" text={isMode} />
          <div className="flex mb-[16px]">
            {colleagueIcon}
            {historyIcon}
            {historIcon}
            {histoIcon}
          </div>
        </div>
        <div className="p-4 rounded-[16px] bg-[#1E1E1E] min-h-[25vh] max-h-[25vh]">
          {isMode === modes[0] ? (
            <table className="w-[100%]">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="bg-[#FFFFFF2F] border-[2px] border-gray-300"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="overflow-y-auto bg-[#FFFFFF1F] scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-2 border-[2px] border-gray-400"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
