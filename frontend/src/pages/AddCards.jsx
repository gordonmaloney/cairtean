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

function AddCards() {
  const [cardData, setCardData] = useState({
    front: "",
    back: "",
    date: new Date().setHours(0,0,0,0),
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

    let duplicate = cards.find(card => card.front == cardData.front) && cards.find(card => card.back == cardData.back)


    if (duplicate) {
      setOpen(true)
    }
    //check for duplicate
    //import all cards, map front, then back

    if (!duplicate && cardData.front && cardData.back) {
      dispatch(createCard({ cardData }));
      setCardData({
        front: "",
        back: "",
        date: new Date().setHours(0,0,0,0),
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
      date: new Date().setHours(0,0,0,0),
      delay: 1,
      reviews: 0,
      tag: "",
    });
    setOpen(false)
  }

  return (
    <section>
      <h2>Add new cards to your deck here:</h2> <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <FormLabel htmlFor="front">Front</FormLabel>
        </Grid>
        <Grid item xs={10}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            name="front"
            id="front"
            value={cardData.front}
            placeholder="Enter the front side of the card here"
            onChange={(e) =>
              setCardData({ ...cardData, front: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <FormLabel htmlFor="back">Back</FormLabel>
        </Grid>
        <Grid item xs={10}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            name="back"
            id="back"
            value={cardData.back}
            placeholder="Enter the back of the card here"
            onChange={(e) => setCardData({ ...cardData, back: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={!cardData.front || !cardData.back}
          >
            Create New Card
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          It looks like you already have a card with these fields. Are you sure
          you want to add this to your deck?
          <br />
          <br />
          <Button variant="contained" onClick={confirmAdd}>
            Confirm
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </section>
  );
}

export default AddCards;
