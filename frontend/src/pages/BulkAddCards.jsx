import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";
import { WORDS } from "./WORDS.js";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";

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
  const [level, setLevel] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkAddLevel = (level) => {
    console.log(WORDS.filter((word) => word.level == level));

    dispatch(createCardsBulk([...WORDS.filter((word) => word.level == level)]));
    handleClose();
  };

    //fetch cards
    const { cards, isLoading, isError, message } = useSelector(
      (state) => state.cards
    );
  
    useEffect(() => {
      if (isError) {
        console.log(message);
      }
  
      dispatch(getCards());
  
      return () => {
        dispatch(reset());
      };
    }, []);

    const [duplicate, setDuplicate] = useState(false)

    if (cards.find(card => card.level == level) && duplicate == false) {
      setDuplicate(true)
    }



  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectLevel = (settingLevel) => {
    console.log('duplicate ', duplicate)

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
          {!duplicate ? <>Add all {WORDS.filter((word) => word.level == level).length} words
          from {level} to your deck?</>: <>It looks like the words from {level} are already in your deck - are you sure you want to add them again?</>}
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
