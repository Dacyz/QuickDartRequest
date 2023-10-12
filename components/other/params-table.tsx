import { ParameterRow, HeaderRow } from "@/data/models/parameter";
import React, { useState } from "react";

interface TitleProps<T> {
  rows: T[];
  className?: string;
  onChange?: (value: T[]) => void | undefined;
  addRow: () => void;
  setRows: (value: T[]) => void;
  deleteRow: (id: number) => void;
}

const ParamsTable: React.FC<TitleProps<ParameterRow>> = ({
  rows,
  onChange,
  addRow,
  deleteRow,
  setRows,
}) => {
  const sendParamsValues = (row: ParameterRow) => {
    if (row === rows[rows.length - 1]) {
      addRow();
    }
    if (onChange) {
      onChange(rows);
    }
  };
  if (rows.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <table
          className="min-w-full divide-y rounded-lg border border-[#5B5B5B]"
          style={{
            borderCollapse: "inherit",
          }}
        >
          <thead className="bg-[#FFFFFF20]">
            <tr>
              <th className="p-3 text-left"></th>
              <th className="p-2 text-left w-1/2">Key</th>
              <th className="p-2 text-left w-1/2">Value</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col gap-3 flex-grow items-center justify-center">
          Sin parámetros no hay paraíso
          <button className="button rounded-[16px]" onClick={addRow}>
            Agregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <table
        className="min-w-full divide-y rounded-lg border border-[#5B5B5B]"
        style={{
          borderCollapse: "inherit",
        }}
      >
        <thead className="bg-[#FFFFFF20]">
          <tr>
            <th className="p-3 text-left"></th>
            <th className="p-2 text-left">Key</th>
            <th className="p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody className=" bg-[#FFFFFF10]">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="text-center">
                {row.key !== "" || row.value !== "" ? (
                  <input
                    type="checkbox"
                    checked={row.estado}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      let newRow = updatedRows.find((r) => r.id === row.id)!;
                      newRow.estado = !row.estado;
                      setRows(updatedRows);
                    }}
                  />
                ) : (
                  <></>
                )}
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.key}
                  className="bg-transparent w-full border-none focus:border-gray-700 outline-none hover:border-gray-800 rounded-md"
                  placeholder="Key"
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    let newRow = updatedRows.find((r) => r.id === row.id)!;
                    newRow.key = e.target.value;
                    setRows(updatedRows);
                    sendParamsValues(newRow);
                  }}
                />
              </td>
              <td className="p-2 flex justify-center items-center">
                <input
                  type="text"
                  value={row.value}
                  className="bg-transparent w-full border-none focus:border-gray-700 outline-none hover:border-gray-800 rounded-md"
                  placeholder="Value"
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    let newRow = updatedRows.find((r) => r.id === row.id)!;
                    newRow.value = e.target.value;
                    setRows(updatedRows);
                    sendParamsValues(newRow);
                  }}
                />
                {rows.length > 2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="19"
                    className="ml-2 cursor-pointer opacity-0 hover:opacity-95 transition-opacity"
                    viewBox="0 0 17 19"
                    fill="none"
                    onClick={() => deleteRow(row.id)}
                  >
                    <path
                      d="M5.17508 0.42981V1.42981H0.175079V3.42981H1.17508V16.4298C1.17508 16.9602 1.38579 17.469 1.76087 17.844C2.13594 18.2191 2.64465 18.4298 3.17508 18.4298H13.1751C13.7055 18.4298 14.2142 18.2191 14.5893 17.844C14.9644 17.469 15.1751 16.9602 15.1751 16.4298V3.42981H16.1751V1.42981H11.1751V0.42981H5.17508ZM3.17508 3.42981H13.1751V16.4298H3.17508V3.42981ZM5.17508 5.42981V14.4298H7.17508V5.42981H5.17508ZM9.17508 5.42981V14.4298H11.1751V5.42981H9.17508Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <div className="w-[25px] h-[19px]"></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const HeaderTable: React.FC<TitleProps<HeaderRow>> = ({
  rows,
  onChange,
  addRow,
  deleteRow,
  setRows,
}) => {
  const sendParamsValues = (row: HeaderRow) => {
    if (row === rows[rows.length - 1]) {
      addRow();
    }
    if (onChange) {
      onChange(rows);
    }
  };
  if (rows.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <table
          className="min-w-full divide-y rounded-lg border border-[#5B5B5B]"
          style={{
            borderCollapse: "inherit",
          }}
        >
          <thead className="bg-[#FFFFFF20]">
            <tr>
              <th className="p-3 text-left"></th>
              <th className="p-2 text-left w-1/2">Key</th>
              <th className="p-2 text-left w-1/2">Value</th>
            </tr>
          </thead>
        </table>
        <div className="flex flex-col gap-3 flex-grow items-center justify-center">
          Sin parámetros no hay paraíso
          <button className="button rounded-[16px]" onClick={addRow}>
            Agregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <table
        className="min-w-full divide-y rounded-lg border border-[#5B5B5B]"
        style={{
          borderCollapse: "inherit",
        }}
      >
        <thead className="bg-[#FFFFFF20]">
          <tr>
            <th className="p-3 text-left"></th>
            <th className="p-2 text-left">Key</th>
            <th className="p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody className=" bg-[#FFFFFF10]">
          {rows.map((row) => (
            <tr key={row.id} className="bg-[#FFFFFF00]">
              <td className="text-center">
                {row.key !== "" || row.value !== "" ? (
                  <input
                    type="checkbox"
                    checked={row.estado}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      let newRow = updatedRows.find((r) => r.id === row.id)!;
                      newRow.estado = !row.estado;
                      setRows(updatedRows);
                    }}
                  />
                ) : (
                  <></>
                )}
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.key}
                  className="bg-transparent w-full border-none focus:border-gray-700 outline-none hover:border-gray-800 rounded-md"
                  placeholder="Key"
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    let newRow = updatedRows.find((r) => r.id === row.id)!;
                    newRow.key = e.target.value;
                    setRows(updatedRows);
                    sendParamsValues(newRow);
                  }}
                />
              </td>
              <td className="p-2 flex justify-center items-center">
                <input
                  type="text"
                  value={row.value}
                  className="bg-transparent w-full border-none focus:border-gray-700 outline-none hover:border-gray-800 rounded-md"
                  placeholder="Value"
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    let newRow = updatedRows.find((r) => r.id === row.id)!;
                    newRow.value = e.target.value;
                    setRows(updatedRows);
                    sendParamsValues(newRow);
                  }}
                />
                {rows.length > 2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="19"
                    className="ml-2 cursor-pointer opacity-0 hover:opacity-95 transition-opacity"
                    viewBox="0 0 17 19"
                    fill="none"
                    onClick={() => deleteRow(row.id)}
                  >
                    <path
                      d="M5.17508 0.42981V1.42981H0.175079V3.42981H1.17508V16.4298C1.17508 16.9602 1.38579 17.469 1.76087 17.844C2.13594 18.2191 2.64465 18.4298 3.17508 18.4298H13.1751C13.7055 18.4298 14.2142 18.2191 14.5893 17.844C14.9644 17.469 15.1751 16.9602 15.1751 16.4298V3.42981H16.1751V1.42981H11.1751V0.42981H5.17508ZM3.17508 3.42981H13.1751V16.4298H3.17508V3.42981ZM5.17508 5.42981V14.4298H7.17508V5.42981H5.17508ZM9.17508 5.42981V14.4298H11.1751V5.42981H9.17508Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <div className="w-[25px] h-[19px]"></div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { ParamsTable, HeaderTable };
