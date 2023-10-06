import React from 'react';

interface SubtitleProps {
  text: string;
  className?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ text, className }) => {
  return (
    <div className={`text-[#ffffff88] bg-opacity-50 font-semibold text-[10px] ${className}`}>{text}</div>
  );
};

export default Subtitle;