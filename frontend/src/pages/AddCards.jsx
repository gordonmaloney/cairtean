import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCard } from "../features/cards/cardSlice";
import { Button, FormLabel, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Hidden} from "@mui/material";
import * as MUIStyle from "../MUIStyles";

function AddCards() {
  const [cardData, setCardData] = useState({
    front: "",
    back: "",
    date: new Date().setHours(0, 0, 0, 0),
    delay: 0,
    reviews: 0,
    tag: "",
  });

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [level, setLevel] = useState("");

  const onSubmit = (e) => {
    if (!cardData.front || !cardData.back) {
      console.log("need to enter a front and back field");
    }

    let duplicate =
      cards.find((card) => card.front == cardData.front) &&
      cards.find((card) => card.back == cardData.back);

    if (duplicate) {
      setOpen(true);
    }
    //check for duplicate
    //import all cards, map front, then back

    if (!duplicate && cardData.front && cardData.back) {
      dispatch(createCard({ cardData }));
      setCardData({
        front: "",
        back: "",
        date: new Date().setHours(0, 0, 0, 0),
        delay: 1,
        reviews: 0,
        tag: "",
      });
    }
  };

  const confirmAdd = () => {
    dispatch(createCard({ cardData }));
    setCardData({
      front: "",
      back: "",
      date: new Date().setHours(0, 0, 0, 0),
      delay: 1,
      reviews: 0,
      tag: "",
    });
    setOpen(false);
  };

  return (
    <section className="drawerContainer">
      <h2>Add new cards to your deck here:</h2> <br />
      <br />
      <Grid container spacing={2}>
        <Hidden smDown>
          <Grid item md={2} style={{ display: "flex", alignItems: "center" }}>
            <FormLabel sx={MUIStyle.LabelStyle} htmlFor="front">
              Front
            </FormLabel>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={10}>
          <TextField
            sx={MUIStyle.TextFieldStyle}
            type="text"
            name="front"
            id="front"
            value={cardData.front}
            placeholder="Front of card"
            onChange={(e) =>
              setCardData({ ...cardData, front: e.target.value })
            }
          />
        </Grid>
        <Hidden smDown>

        <Grid item md={2} style={{ display: "flex", alignItems: "center" }}>
          
          <FormLabel sx={MUIStyle.LabelStyle} htmlFor="back">
            Back
          </FormLabel>
        </Grid>
        </Hidden>
        <Grid item xs={12} md={10}>
          <TextField
            sx={MUIStyle.TextFieldStyle}
            type="text"
            name="back"
            id="back"
            value={cardData.back}
            placeholder="Back of card"
            onChange={(e) => setCardData({ ...cardData, back: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <center>
            <Button
              sx={MUIStyle.ButtonStyle}
              variant="contained"
              onClick={onSubmit}
              disabled={!cardData.front || !cardData.back}
            >
              Create New Card
            </Button>
          </center>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MUIStyle.ModalStyle}>
          <h3>Are you sure?</h3>
          <br />
          <br />
          <p>
            {" "}
            It looks like you already have a card with these fields. Are you
            sure you want to add this to your deck?
          </p>
          <br />
          <br />
          <center>
            <Button
              variant="contained"
              onClick={confirmAdd}
              sx={MUIStyle.ButtonStyle}
            >
              Confirm
            </Button>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleClose}
              sx={MUIStyle.ButtonStyleCancel}
            >
              Cancel
            </Button>
          </center>
        </Box>
      </Modal>
    </section>
  );
}

export default AddCards;
