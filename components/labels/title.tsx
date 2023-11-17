import React from "react";

interface TitleProps {
  text: string;
  style?: "small" | "large";
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className, style }) => {
  const baseClass =
    "font-medium text-white text-center flex items-center align-middle";
  if (style === "small") {
    return (
      <h3
        className={`${baseClass} text-[16px] overflow-hidden whitespace-nowrap overflow-ellipsis ${className}`}
      >
        {text}
      </h3>
    );
  }
  return (
    <h3
      className={`${baseClass} text-[20px] overflow-hidden whitespace-nowrap overflow-ellipsis ${className}`}
    >
      {text}
    </h3>
  );
};

const Subtitle: React.FC<TitleProps> = ({ text, className }) => {
  return (
    <div
      className={`text-[#ffffff88] bg-opacity-50 font-semibold text-[10px] ${className}`}
    >
      {text}
    </div>
  );
};

export { Title, Subtitle };
