import React from "react";

const GetLabel: React.FC = () => {
  return (
    <div className="px-4 py-1 bg-[#00FF2940] rounded-[16px]">
      <p className="text-[#00FF29] text-[12px] font-semibold">GET</p>
    </div>
  );
};
const PostLabel: React.FC = () => {
  return (
    <div className="px-4 py-1 bg-[#FFF50040] rounded-[16px]">
      <p className="text-[#FFF500] text-[12px] font-semibold">POST</p>
    </div>
  );
};

const PutLabel: React.FC = () => {
  return (
    <div className="px-4 py-1 bg-[#48A1F640] rounded-[16px]">
      <p className="text-[#48A1F6] text-[12px] font-semibold">PUT</p>
    </div>
  );
};

const DeleteLabel: React.FC = () => {
  return (
    <div className="px-4 py-1 bg-[#FF3D0040] rounded-[16px]">
      <p className="text-[#FF3D00] text-[12px] font-semibold">DELETE</p>
    </div>
  );
};

const ParseLabel: React.FC = () => {
  return (
    <div className="px-4 py-1 bg-[#FFFFFF40] rounded-[16px]">
      <p className="text-[#FFFFFF] text-[12px] font-semibold">PARSE</p>
    </div>
  );
};

export { GetLabel, PostLabel, PutLabel, DeleteLabel, ParseLabel };
