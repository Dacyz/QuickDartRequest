// Importar los módulos necesarios de React y Next.js
import React, { useState } from "react";

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

// Definir un componente funcional Switch
const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  // Estado para controlar si el switch está activado o desactivado
  const [checked, setChecked] = useState<boolean>(value);

  // Función para manejar el cambio de estado del switch
  const handleToggle = () => {
    setChecked((prevChecked) => !prevChecked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      value={checked ? "on" : "off"}
      aria-label="Chat history & training"
      onClick={handleToggle}
      className={`cursor-pointer ${
        checked ? "bg-gray-400" : "bg-gray-500"
      } relative shrink-0 rounded-full h-[25px] w-[42px]`}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={`flex items-center justify-center rounded-full translate-x-0.5 transition-transform duration-100 will-change-transform bg-gray-700 ${
          checked ? "bg-white" : "bg-gray-700"
        } shadow-[0_1px_2px_rgba(0,0,0,0.45)] h-[21px] w-[21px] ${
          checked ? "translate-x-[19px]" : ""
        }`}
      ></span>
    </button>
  );
};

// Exportar el componente Switch
export default Switch;
