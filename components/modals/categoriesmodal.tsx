import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
import SettingsIcon from "@mui/icons-material/Settings";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";

function CategoriesModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="button-icon ">
        <ControlPointDuplicateIcon fontSize="small" />
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        Category List
      </Modal>
    </>
  );
}

function ConvertModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="button-icon rounded-l-2xl"
      >
        <SettingsIcon fontSize="small" />
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        Convert List
      </Modal>
    </>
  );
}

export { CategoriesModal, ConvertModal };
