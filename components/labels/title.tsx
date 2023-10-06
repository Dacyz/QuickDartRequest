import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className }) => {
  return (
    <div className={`font-semibold text-white text-[24px] ${className}`}>{text}</div>
  );
};

export default Title;