import { useState } from "react";
import Flashcard from "../components/Flashcard";
import { Button } from "@mui/material";
import * as MUIStyle from "../MUIStyles";
import { SocialShare } from "../components/SocialShare";

import AboutModal from "./AboutModal";
import { useEffect } from "react";

function Review({ cards, forgottenCards, level }) {
  const [index, setIndex] = useState(0);

  const [cardsDue, setCardsDue] = useState([]);

  useEffect(() => {
    if (!level && cards) {
      setCardsDue(
        cards
          .filter((card) => card.tag != "known")
          .filter((card) => new Date() > new Date(card.date))
          .sort((a, b) => a.date - b.date)
      );
    }
    if (!cards && forgottenCards.length > 0) {
      setCardsDue(forgottenCards);
    }
    if (level) {
      setCardsDue(cards)
    }
  }, [cards, forgottenCards.length]);

  console.log(level)
  console.log(!cards && forgottenCards.length > 0)

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

  if (cardsDue.length > 0 && cardsDue.length - index == 0) {
    return (
      <>
        <h3>Congrats - you've studied all your cards for today!</h3>
        <br />
        <br />
        <SocialShare />
        <br />
        {forgottenCards.length > 0 && (
          <p>
            You got {forgottenCards.length} wrong today. <br />
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
        )}
      </>
    );
  }

  if (cardsDue.length - index > 0) {
    return (
      <>
        <center>
          {/*
          <AboutModal />
    */}

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
