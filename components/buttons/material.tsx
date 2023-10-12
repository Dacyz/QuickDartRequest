import React from "react";

interface MaterialProps {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Material: React.FC<MaterialProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={`bg-white p-[10px] flex items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Material;
