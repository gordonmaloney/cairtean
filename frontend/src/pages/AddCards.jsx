import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCard } from "../features/cards/cardSlice";
import { Button, FormLabel, TextField, Grid } from "@mui/material";

function AddCards() {
  const [cardData, setCardData] = useState({
    front: "",
    back: "",
    date: "",
    delay: 0,
    reviews: 0,
    tag: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    if (!cardData.front || !cardData.back) {
      console.log("need to enter a front and back field");
    }

    if (cardData.front && cardData.back) {
      dispatch(createCard({ cardData }));
      setCardData({
        front: "",
        back: "",
        date: "",
        delay: 1,
        reviews: 0,
        tag: "",
      });
    }
  };

  return (
    <section>
    <h2>Add new cards to your deck here:</h2> <br/><br/>
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
    </section>
  );
}

export default AddCards;
