import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className }) => {
  return (
    <h3 className={`font-semibold text-white text-center flex items-center align-middle text-[20px] ${className}`}>{text}</h3>
  );
};

export default Title;