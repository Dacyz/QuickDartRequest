// Importar los módulos necesarios de React y Next.js
import { Close, FileUpload } from "@mui/icons-material";
import React, { ChangeEvent, DragEvent, useState } from "react";

interface FilePickerProps {
  onChange?: (file: File) => void;
}

// Definir un componente funcional FilePicker
const FilePicker: React.FC<FilePickerProps> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Manejar la selección de archivos desde el input
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === "application/json") {
      // Si es un archivo JSON, establecerlo como seleccionado
      setSelectedFile(file);

      // Llamar a la función onChange si está definida
      if (onChange) {
        onChange(file);
      }

      setIsDragging(false);
    } else {
      // Limpiar la selección si no es un archivo JSON
      setSelectedFile(null);
    }
  };

  // Manejar eventos de arrastrar y soltar
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file && file.type === "application/json") {
      // Si es un archivo JSON, establecerlo como seleccionado
      setSelectedFile(file);

      // Llamar a la función onChange si está definida
      if (onChange) {
        onChange(file);
      }
    }

    setIsDragging(false);
  };

  return (
    <>
      <div
        className={`p-6 border-dashed border-2 border-gray-300 rounded-md cursor-pointer flex justify-between ${
          isDragging ? "border-blue-500" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {selectedFile ? (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          ) : (
            <p className="font-light">
              <FileUpload />{" "}
              {isDragging ? "Drop your file here" : "Select or drag your file"}
              <span className="text-[14px]"> (.json)</span>
            </p>
          )}
        </label>
        {selectedFile ? (
          <Close
            onClick={() => {
              setSelectedFile(null);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

// Exportar el componente FilePicker
export default FilePicker;
