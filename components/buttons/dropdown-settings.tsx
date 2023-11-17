import { useDashboardContext } from "@/context/context";
import { options } from "@/data/data/methods";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AvatarLetter from "../labels/avatar";
import { Title } from "../labels/title";
import {
  ArrowRight,
  Forest,
  Settings,
  Window,
  TimeToLeave,
} from "@mui/icons-material";
import Link from "next/link";
import SettingsModal from "../modals/settings-modal";

interface TitleProps {
  className?: string;
}

const DropDownSettingsBox: React.FC<TitleProps> = (className) => {
  const [isOpen, setOpen] = useState(false);
  const { userSettings } = useDashboardContext();
  return (
    <div
      className="relative min-w-[72px] text-center text-[12px] gap-2 justify-start items-center flex-row flex cursor-pointer hover:bg-[#1E1E1E] p-2"
      style={{
        borderRadius: !isOpen ? "16px" : "0 0 16px 16px",
      }}
      onClick={() => setOpen(true)}
    >
      <AvatarLetter text={userSettings.userName} />
      <Title style="small" text={userSettings.userName} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -20, opacity: [0.1, 1] }}
            exit={{ y: 0, opacity: [0.5, 0] }}
            transition={{ duration: 0.1 }}
            // onMouseLeave={() => setOpen(false)}
            className="absolute w-[288px] left-0 bg-[#1E1E1E] rounded-b-2xl z-50"
          >
            <CustomMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomMenu: React.FC = () => {
  return (
    <div
      className="absolute bottom-full left-0 z-20 mb-1 w-full overflow-hidden rounded-lg bg-white pb-1.5 pt-1 outline-none gizmo:border gizmo:border-gray-100 dark:bg-[#1E1E1E] opacity-100 translate-y-0"
      aria-labelledby="headlessui-menu-button-:r3r:"
      id="headlessui-menu-items-:r41:"
      role="menu"
      tabIndex={0}
      data-headlessui-state="open"
    >
      <nav role="none">
        <a
          className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          id="headlessui-menu-item-:r42:"
          role="menuitem"
          tabIndex={-1}
          data-headlessui-state=""
        >
          <Forest />
          Custom instructions
        </a>
        <SettingsModal/>
        <div className="h-px dark:bg-white/10 bg-black/20" role="none" />
        <Link
          href={"/about"}
          className="flex px-3 min-h-[44px] py-1 items-center gap-3 dark:text-white cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          id="headlessui-menu-item-:r44:"
          role="menuitem"
          tabIndex={-1}
          data-headlessui-state=""
        >
          <Window />
          Leave
        </Link>
      </nav>
    </div>
  );
};

export default DropDownSettingsBox;
