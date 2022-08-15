import { useState } from "react";
import Flashcard from "../components/Flashcard";

function Review({ cards, noRemaining }) {
  const [index, setIndex] = useState(0);

  const [cardsDue, setCardsDue] = useState(
    cards
      .filter((card) => new Date() > new Date(card.date))
      .sort((a, b) => a.date - b.date)
  );

  const [card, setCard] = useState(cardsDue[index]);

  if (cardsDue.length < 1) {
    return <>You have no cards due!</>;
  }

  const pushWrongCard = (wrongCard) => {
    console.log("pushing wrong card: ", wrongCard.front);
    setCardsDue((prev) => [...prev, wrongCard]);
  };

  const incrementIndex = () => {
      setIndex((prev) => prev + 1);
  };



  if (cardsDue.length - index == 0) {
    return (
      <h1>Congrats!</h1>
    )
  }
  
  if (cardsDue.length - index > 0) {
    return (
      <section><br/><br/>
        index: {index} <br/>
        cardsDueLength: {cardsDue.length}
        <center>
          <Flashcard
            card={cardsDue[index]}
            remaining={cardsDue.length - index}
            pushWrongCard={(wrongCard) => pushWrongCard(wrongCard)}
            incrementIndex={incrementIndex}
          />
        </center>
        <br />
      </section>
    );
  }
}

export default Review;
