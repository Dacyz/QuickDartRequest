// components/Avatar.tsx
import React from 'react';

interface AvatarProps {
  text: string;
}

const AvatarLetter: React.FC<AvatarProps> = ({ text }) => {
  const firstLetter = text.length == 0 ? 'U' : text.charAt(0).toUpperCase();
  return (
    <div className="flex items-center justify-center w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full bg-blue-500 text-white font-bold text-lg">
      {firstLetter}
    </div>
  );
};

export default AvatarLetter;
