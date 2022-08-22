import { useState } from "react";
import Flashcard from "../components/Flashcard";
import { Button } from "@mui/material";
import * as MUIStyle from "../MUIStyles";

import AboutModal from "./AboutModal";

function Review({ cards, forgottenCards }) {
  const [index, setIndex] = useState(0);

  const [cardsDue, setCardsDue] = useState(
    cards
      .filter((card) => card.tag != "known")
      .filter((card) => new Date() > new Date(card.date))
      .sort((a, b) => a.date - b.date)
  );

  const [card, setCard] = useState(cardsDue[index]);

  if (cardsDue.length < 1 && forgottenCards.length < 1) {
    return <>You have no cards due!</>;
  }

  if (cardsDue.length < 1 && forgottenCards.length > 1) {
    return (
      <>
        <h3>Congrats!</h3>
        <br />
        <br />
        You've finished your cards for today, but you got{" "}
        {forgottenCards.length} wrong. <br />
        <br />
        Would you like to review them again?
        <br />
        <br />
        <Button
          sx={MUIStyle.ButtonStyle}
          variant="contained"
          onClick={() => {
            setCardsDue(forgottenCards);
          }}
        >
          Review forgotten cards
        </Button>
      </>
    );
  }

  const pushWrongCard = (wrongCard) => {
    console.log("pushing wrong card: ", wrongCard.front);
    setCardsDue((prev) => [...prev, wrongCard]);
  };

  const incrementIndex = () => {
    setIndex((prev) => prev + 1);
  };

  console.log(cardsDue)

  if (cardsDue.length > 0 && cardsDue.length - index == 0) {
    return (
      <>
        <h3>Congrats - you've studied all your cards for today!</h3>

<br/><br/>
        <p>
          You got {forgottenCards.length} wrong. <br />
          <br />
          Would you like to review them again?
          <br />
          <br />
          <Button
            sx={MUIStyle.ButtonStyle}
            variant="contained"
            onClick={() => {
              setIndex(0);
              setCardsDue(forgottenCards);
            }}
          >
            Review forgotten cards
          </Button>
          
        </p>
      </>
    );
  }

  if (cardsDue.length - index > 0) {
    return (
      <>
        <center>
          <AboutModal />

          <Flashcard
            cardOne={cardsDue[index]}
            remaining={cardsDue.length - index}
            pushWrongCard={(wrongCard) => pushWrongCard(wrongCard)}
            incrementIndex={incrementIndex}
          />
        </center>
      </>
    );
  }
}

export default Review;
