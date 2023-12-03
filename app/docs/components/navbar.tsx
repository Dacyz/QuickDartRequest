"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LogoIcon from "@/utils/icons/logo";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="bg-gray-800 fixed w-full p-4 top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <LogoIcon />
          <Link href="/" className="text-white text-lg font-bold">
            QuickDartRequest
          </Link>
        </div>
        <div className="gap-4 md:hidden" onClick={() => setOpen(!isOpen)}>
          ☰
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: [0.1, 1] }}
                exit={{ y: -5, opacity: [0.5, 0] }}
                transition={{ duration: 0.1 }}
                onMouseLeave={() => setOpen(false)}
                className="absolute top-14 left-0 h-20 w-full bg-gray-800 rounded-b-2xl z-50 flex items-center justify-around"
              >
                <Link href="../#caracteristicas">
                  <button className="heroOutlinedButton rounded-[16px] md:rounded-r-2xl">
                    Conocer más
                  </button>
                </Link>
                <Link href="start">
                  <button className="heroFilledButton rounded-[16px] md:rounded-r-2xl">
                    Iniciar
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="gap-4 hidden md:flex">
          <Link href="../#caracteristicas">
            <button className="heroOutlinedButton rounded-[16px] md:rounded-r-2xl">
              Conocer más
            </button>
          </Link>
          <Link href="start">
            <button className="heroFilledButton rounded-[16px] md:rounded-r-2xl">
              Iniciar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const DropDownMethodBox: React.FC = () => {
  return (
    <div className="relative min-w-[72px] text-center text-[12px] justify-center items-center flex-row flex cursor-pointer">
      <p className="py-[11px] flex text-center items-center justify-center">
        {"Select"}
      </p>
    </div>
  );
};
