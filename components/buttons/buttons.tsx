import React from "react";

interface ButtonExportProps {
  className?: string;
  onClick?: () => void;
  text?: string;
}

const ButtonExport: React.FC<ButtonExportProps> = ({ text, onClick }) => {
  return (
    <button
      className="px-4 py-2 border border-gray-800 text-gray-800 dark:bg-gray-800 dark:text-white rounded-md transition-all duration-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:border-blue-300"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {text ?? "Button"}
    </button>
  );
};

const ResetButton: React.FC = ({}) => {
  return (
    <button className="px-4 py-2 border border-red-700 text-red-700 dark:bg-red-700 dark:text-white rounded-md transition-all duration-300 hover:bg-red-800 hover:text-white focus:outline-none focus:ring focus:border-blue-300">
      Reset
    </button>
  );
};

export default ButtonExport;

export { ResetButton };
