import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ value, options, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="relative bg-[#1E1E1E] border-l border-[#FFFFFF20] min-w-[156px] text-center text-[12px] justify-center items-center flex-row flex cursor-pointer"
      onClick={() => setOpen(!isOpen)}
    >
      <p className="py-[11px] truncate p-2 text-center w-[156px]">
        {value ?? "Select"}
      </p>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: [0.1, 1] }}
            exit={{ y: -5, opacity: [0.5, 0] }}
            transition={{ duration: 0.1 }}
            onMouseLeave={() => setOpen(false)}
            className="absolute top-[40px] min-w-[156px] max-w-[156px] bg-[#1E1E1E] rounded-b-2xl z-50"
          >
            {options.map((e, i) => (
              <div
                key={i}
                onClick={() => {
                  setOpen(false);
                  onChange(e);
                }}
                className="p-2 hover:font-semibold truncate w-[156px] justify-between items-center cursor-pointer"
              >
                {e}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
