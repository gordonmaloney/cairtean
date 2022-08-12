import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Flashcard from "../components/Flashcard";
import { updateCard } from "../features/cards/cardSlice";

function Review({ cards }) {
  
  const cardsDue = cards
    .filter((card) => new Date() > new Date(card.date))
    .sort((a, b) => a.date - b.date);


  const [card, setCard] = useState(cardsDue[0]);

  if (cardsDue.length < 1) {
    return <>You have no cards due!</>;
  }

  if (cardsDue.length > 0) {
    return (
      <section>
        <center>
          <Flashcard card={card} remaining={cardsDue.length} />
        </center>
        <br />
      </section>
    );
  }
}

export default Review;
