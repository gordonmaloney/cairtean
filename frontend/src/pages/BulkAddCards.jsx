import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";
import { WORDS } from "./WORDS.js";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BulkAddCards() {
  const levels = Array.from(new Set(WORDS.map((word) => word.level)));

  const dispatch = useDispatch();

  const bulkAddLevel = (level) => {
    console.log(WORDS.filter((word) => word.level == level));

    dispatch(createCardsBulk([...WORDS.filter((word) => word.level == level)]));
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [level, setLevel] = useState("");

  const handleSelectLevel = (settingLevel) => {
    handleOpen();
    setLevel(settingLevel.target.textContent);
  };

  return (
    <>
      <h3>
        To add the vocabulary from a Duolingo level, just select the level
        below:
      </h3>

      {levels.map((level, index) => (
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          size="small"
          onClick={(level) => {
            handleSelectLevel(level);
          }}
          key={index}
        >
          {level}
        </Button>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Add all {WORDS.filter((word) => word.level == level).length} words
          from {level} to your deck?
          <br />
          <br />
          <Button variant="contained" onClick={() => bulkAddLevel(level)}>
            Confirm
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default BulkAddCards;
