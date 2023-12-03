/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import {
  GetLabel,
  PostLabel,
  PutLabel,
  ParseLabel,
  DeleteLabel,
} from "../../../components/labels/labels";
import { Title, Subtitle } from "../../../components/labels/title";
import Material from "../../../components/buttons/material";
import { ClockIcon, CollageIcon } from "../../../utils/icons/icon";
import DropDownSettingsBox from "../../../components/modals/settings-modal";
import { useDashboardContext } from "../../../data/context/context";
import RequestModel from "@/data/models/request_model";
import { firstToUpperCase } from "@/utils/helpers/string_extension";
import { Delete } from "@mui/icons-material";
import LineSeparator from "../../../utils/components/line-separator";

const methodComponents = new Map<number, JSX.Element>([
  [0, <GetLabel />],
  [1, <PostLabel />],
  [2, <PutLabel />],
  [3, <DeleteLabel />],
  [4, <ParseLabel />],
]);

function getMethodDiv(number: number): JSX.Element {
  return methodComponents.get(number) || methodComponents.get(4)!;
}

function getGroupKeyFromDate(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date(); // Fecha actual
  const timeDiff = today.getTime() - date.getTime(); // Diferencia de tiempo en milisegundos
  const daysDiff = timeDiff / (1000 * 3600 * 24); // Diferencia en días

  if (daysDiff <= 7) {
    // Agrupar por día si son 7 días o menos
    if (daysDiff < 1) {
      return "Hoy";
    }
    if (daysDiff <= 2) {
      return "Ayer";
    }
    return "Esta semana";
    // return getDayFromDate(timestamp);
  } else if (daysDiff <= 30) {
    // Agrupar por semana si son más de 7 días pero 30 días o menos
    return `Hace ${Math.floor(daysDiff / 7)} semanas`;
  } else {
    // Agrupar por mes si son más de 30 días
    return firstToUpperCase(
      moment(timestamp).locale("es_MX").format("MMMM YYYY")
    );
  }
}

function ListRequest() {
  const [isColleagueActive, setIsColleagueActive] = useState(true);
  const {
    localData: data,
    removeLocalStorage,
    setRequestModel,
    setResponseModel,
  } = useDashboardContext();
  const colleagueIcon = (
    <Material
      className={`rounded-l-[24px] transition-opacity ${
        isColleagueActive ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setIsColleagueActive(true);
      }}
    >
      <CollageIcon />
    </Material>
  );
  const historyIcon = (
    <Material
      className={`rounded-r-[24px] transition-opacity ${
        !isColleagueActive ? "opacity-100" : "opacity-50"
      }`}
      onClick={() => {
        setIsColleagueActive(false);
      }}
    >
      <ClockIcon />
    </Material>
  );
  const groupedItems: { [key: string]: RequestModel[] } = {};

  data.forEach((item) => {
    const groupKey =
      (!isColleagueActive ? getGroupKeyFromDate(item.timeStamp) : item.group) ??
      "";
    if (!groupedItems[groupKey]) {
      groupedItems[groupKey] = [];
    }
    groupedItems[groupKey].push(item);
  });
  // Ordenar los elementos dentro de cada grupo de más reciente a más antiguo
  const sortedGroupedItems: { [key: string]: RequestModel[] } = {};

  for (const groupKey in groupedItems) {
    if (groupedItems.hasOwnProperty(groupKey)) {
      sortedGroupedItems[groupKey] = groupedItems[groupKey].sort(
        (a, b) => b.timeStamp - a.timeStamp
      );
    }
  }
  // Obtener un arreglo de las claves de los grupos
  const groupKeys = Object.keys(groupedItems);

  // Ordenar las claves de los grupos según la fecha del primer elemento en cada grupo
  groupKeys.sort((a, b) => {
    if (!isColleagueActive) {
      const timestampA = sortedGroupedItems[a][0].timeStamp;
      const timestampB = sortedGroupedItems[b][0].timeStamp;
      return timestampB - timestampA; // Cambia a "timestampB - timestampA" para ordenar en orden descendente
    } else {
      return a.length - b.length;
    }
  });

  // Crear un nuevo objeto para almacenar los grupos ordenados
  const sortedGroupedItem: { [key: string]: RequestModel[] } = {};

  // Llenar el objeto "sortedGroupedItems" con los grupos ordenados
  groupKeys.forEach((groupKey) => {
    sortedGroupedItem[groupKey] = sortedGroupedItems[groupKey];
  });

  // Crear un JSX.Element que liste los grupos y elementos dentro de cada grupo
  const groupsAndItemsJSX = Object.keys(sortedGroupedItem).map((groupKey) => {
    const group = sortedGroupedItem[groupKey];
    return (
      <li key={groupKey} className="flex flex-col gap-2">
        {groupKey === "" ? <></> : <Subtitle text={groupKey} />}
        <ul className="flex flex-col gap-2">
          {group.map((item, index) => (
            <li
              key={index}
              className="flex px-[12px] py-[8px] bg-[#1E1E1E] transition-colors cursor-pointer hover:bg-[#404040] rounded-[16px] items-center"
              onClick={() => {
                setRequestModel(new RequestModel().copyWith(item));
                setResponseModel(null);
              }}
            >
              {getMethodDiv(item.method.id)}
              <div className="ml-[8px] text-[12px] font-semibold flex w-full justify-between">
                <span className="text-[12px] font-semibold">
                  {item.name ?? item.host}
                </span>
                <div
                  className="text-[12px] font-semibold opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => removeLocalStorage(item.timeStamp)}
                >
                  <Delete fontSize="small" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <div className="min-w-[320px] max-w-[320px] h-screen flex flex-col p-4">
      <div className="flex mb-[16px] justify-between">
        <Title text="Historial" />
        <div className="flex">
          {colleagueIcon}
          {historyIcon}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-vertical-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 scrollbar-thumb-rounded">
        {data.length === 0 ? (
          <div className="flex items-center justify-center text-center h-full">
            Aún no has realizado ninguna petición, realiza nuevas consultas para
            verlas en tu historial
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            <button
              className="bg-[#1E1E1E] text-white py-2 px-4 rounded-[16px] relative w-full text-[12px] font-semibold flex justify-center align-middle gap-1 items-center"
              onClick={() => {
                setRequestModel(new RequestModel());
                setResponseModel(null);
              }}
            >
              <span className="absolute inset-0 border border-white border-dashed rounded-[16px]"></span>
              <BorderClearIcon fontSize="small" /> New Request
            </button>
            {groupsAndItemsJSX}
          </ul>
        )}
      </div>
      <DropDownSettingsBox />
    </div>
  );
}

export default ListRequest;
