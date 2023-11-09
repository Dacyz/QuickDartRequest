"use client";
import React, { useState } from "react";
import Title from "../labels/title";
import Subtitle from "../labels/subtitle";
import Material from "../buttons/material";
import "moment/locale/es";
import {
  GetLabel,
  PostLabel,
  PutLabel,
  ParseLabel,
  DeleteLabel,
} from "../labels/labels";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import moment from "moment";
import { useDashboardContext } from "../../context/context";
import RequestModel from "@/data/models/request_model";

function getMethodDiv(number: number): JSX.Element {
  switch (number) {
    case 0:
      return <GetLabel />;
    case 1:
      return <PostLabel />;
    case 2:
      return <PutLabel />;
    case 3:
      return <DeleteLabel />;
    default:
      return <ParseLabel />;
  }
}

// Función para convertir timestamps en fechas
function getDayFromDate(timestamp: number): string {
  const date = new Date(timestamp);
  // Formatear la fecha como "YYYY-MM-DD" (puedes ajustar el formato según tu preferencia)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function firstToUpperCase(str: string): string {
  if (str.length === 0) {
    return str; // Devuelve una cadena vacía si no se proporciona ninguna cadena
  }

  // Convierte la primera letra a mayúscula y concatena el resto de la cadena
  return str.charAt(0).toUpperCase() + str.slice(1);
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

function List() {
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
      >
        <path
          d="M11 0L0 6L4 8.18V14.18L11 18L18 14.18V8.18L20 7.09V14H22V6L11 0ZM17.82 6L11 9.72L4.18 6L11 2.28L17.82 6ZM16 13L11 15.72L6 13V9.27L11 12L16 9.27V13Z"
          fill="black"
        />
      </svg>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
      >
        <path
          d="M12.5 5H11V10L15.28 12.54L16 11.33L12.5 9.25V5ZM12 0C9.61305 0 7.32387 0.948211 5.63604 2.63604C3.94821 4.32387 3 6.61305 3 9H0L3.96 13.03L8 9H5C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9C19 10.8565 18.2625 12.637 16.9497 13.9497C15.637 15.2625 13.8565 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C7.27 17 9.5 18 12 18C14.3869 18 16.6761 17.0518 18.364 15.364C20.0518 13.6761 21 11.3869 21 9C21 6.61305 20.0518 4.32387 18.364 2.63604C16.6761 0.948211 14.3869 0 12 0Z"
          fill="black"
        />
      </svg>
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
    const timestampA = sortedGroupedItems[a][0].timeStamp;
    const timestampB = sortedGroupedItems[b][0].timeStamp;
    return timestampB - timestampA; // Cambia a "timestampB - timestampA" para ordenar en orden descendente
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
      <div key={groupKey}>
        <Subtitle text={groupKey} className="mt-[16px]" />
        <ul>
          {group.map((item, index) => (
            <li
              key={index}
              className="flex mt-[16px] px-[12px] py-[8px] bg-[#1E1E1E] transition-colors cursor-pointer hover:bg-[#404040] rounded-[16px] items-center"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="19"
                    viewBox="0 0 17 19"
                    fill="none"
                  >
                    <path
                      d="M5.55503 0.87822V1.87822H0.555027V3.87822H1.55503V16.8782C1.55503 17.4087 1.76574 17.9174 2.14081 18.2924C2.51589 18.6675 3.02459 18.8782 3.55503 18.8782H13.555C14.0855 18.8782 14.5942 18.6675 14.9692 18.2924C15.3443 17.9174 15.555 17.4087 15.555 16.8782V3.87822H16.555V1.87822H11.555V0.87822H5.55503ZM3.55503 3.87822H13.555V16.8782H3.55503V3.87822ZM5.55503 5.87822V14.8782H7.55503V5.87822H5.55503ZM9.55503 5.87822V14.8782H11.555V5.87822H9.55503Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
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
        <button
          className="bg-[#1E1E1E] text-white py-2 px-4 rounded-[16px] relative w-full text-[12px] font-semibold flex justify-center align-middle gap-1 items-center"
          onClick={() => {
            setRequestModel(new RequestModel());
            setResponseModel(null);
          }}
        >
          <span className="absolute inset-0 border border-white border-dashed rounded-[16px]"></span>
          <BorderClearIcon fontSize="small"/> New Request
        </button>

        {data.length === 0 ? (
          <div className="flex items-center justify-center text-center h-full">
            Aún no has realizado ninguna petición, realiza nuevas consultas para
            verlas en tu historial
          </div>
        ) : (
          <ul>{groupsAndItemsJSX}</ul>
        )}
      </div>
    </div>
  );
}

export default List;
