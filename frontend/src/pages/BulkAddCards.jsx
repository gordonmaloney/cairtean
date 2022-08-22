import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";
import { WORDS } from "./WORDS.js";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import * as MUIStyle from "../MUIStyles";

import { Snackbar, SnackbarContent } from "@mui/material";


function BulkAddCards() {
  const levels = Array.from(new Set(WORDS.map((word) => word.level)));
  const [level, setLevel] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkAddLevel = (level) => {
    console.log(WORDS.filter((word) => word.level == level));

    dispatch(createCardsBulk([...WORDS.filter((word) => word.level == level)]));
    setSnackOpen(true);

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

  const [duplicate, setDuplicate] = useState(false);

  if (cards.find((card) => card.level == level) && duplicate == false) {
    setDuplicate(true);
  }

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectLevel = (settingLevel) => {
    console.log("duplicate ", duplicate);

    handleOpen();
    setLevel(settingLevel.target.textContent);
  };


    //snack logic
    const [snackOpen, setSnackOpen] = useState(false);
    const handleClick = () => {
      setSnackOpen(true);
    };
    const handleCloseSnack = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackOpen(false);
    };

  return (
    <>
      <h3>
        To add the vocabulary from a Duolingo level, just select the level
        below:
      </h3>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <SnackbarContent
          style={{
            backgroundColor: MUIStyle.blue,
          }}
          message={<p>Success!</p>}
        />
      </Snackbar>

      <Grid container>
        {levels.map((level, index) => (
          <Grid item xs={6} sm={4} md={3}>
            <center>
              <Button
                variant="contained"
                sx={{ ...MUIStyle.ButtonStyle, margin: 1 }}
                size="small"
                onClick={(level) => {
                  handleSelectLevel(level);
                }}
                key={index}
                //disabled={cards.find((card) => card.level == level) != undefined}
              >
                {level}
              </Button>
            </center>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MUIStyle.ModalStyle}>
          {!duplicate ? (
            <>
              <h3>Confirm</h3>
              <br />
              <br />
              <p>
                Add all {WORDS.filter((word) => word.level == level).length}{" "}
                words from {level} to your deck?
              </p>
            </>
          ) : (
            <>
              <h3>Confirm</h3>
              <br />
              <br />
              <p>
                It looks like the words from {level} are already in your deck -
                are you sure you want to add them again?
              </p>
            </>
          )}
          <br />
          <br />
          <center>
          <Button sx={MUIStyle.ButtonStyle} variant="contained" onClick={() => bulkAddLevel(level)}>
            Confirm
          </Button>
          <br />
          <br />
          <Button sx={MUIStyle.ButtonStyleCancel} variant="contained" onClick={() => handleClose()}>
            Cancel
          </Button>
          </center>
        </Box>
      </Modal>
    </>
  );
}

export default BulkAddCards;
