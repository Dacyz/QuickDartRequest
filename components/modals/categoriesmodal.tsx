import { useState } from "react";
import "./modal.css";
import Modal from "./modal";
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

export default CategoriesModal;
