import { useDashboardContext } from "@/context/context";
import { options } from "@/data/data/methods";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface TitleProps {
  className?: string;
}

const DropDownMethodBox: React.FC<TitleProps> = (className) => {
  const [isOpen, setOpen] = useState(false);
  const { setRequestModel, requestModel } = useDashboardContext();
  return (
    <div
      className="relative min-w-[72px] text-center text-[12px] justify-center items-center flex-row flex cursor-pointer"
      style={{
        color: requestModel.method.color,
        backgroundColor: requestModel.method.backgroundColor,
        borderRadius: !isOpen ? "16px 0 0 16px" : "16px 0 0 0",
      }}
      onClick={() => setOpen(!isOpen)}
    >
      <p className="py-[11px] flex text-center items-center justify-center">
        {requestModel.method.name ?? "Select"}
      </p>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: [0.1, 1] }}
            exit={{ y: -5, opacity: [0.5, 0] }}
            transition={{ duration: 0.1 }}
            onMouseLeave={() => setOpen(false)}
            className="absolute top-[40px] w-[72px] bg-[#1E1E1E] rounded-b-2xl z-50"
          >
            {options.map((e, i) => (
              <div
                key={i}
                onClick={() => {
                  setOpen(false);
                  setRequestModel(requestModel.copyWith({ method: e }));
                }}
                style={{
                  color: e.color,
                  backgroundColor: e.backgroundColor,
                  borderRadius: i === options.length - 1 ? "0 0 16px 16px" : "",
                }}
                className="p-2 hover:font-semibold justify-between items-center cursor-pointer"
              >
                {e.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownMethodBox;
