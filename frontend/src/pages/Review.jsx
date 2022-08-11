import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Flashcard from "../components/Flashcard";
import { updateCard } from "../features/cards/cardSlice";

function Review({ cards }) {


  const cardsDue = cards.filter((card) => new Date() > new Date(card.date));


  const [card, setCard] = useState(cards[cardsDue.length-1]);

  
  useEffect(() => {
    cardsDue.length > 0 && setCard(cardsDue[cardsDue.length - 1]);
  }, [cards]);

  if (cardsDue.length < 1) {
    return <>You have no cards due!</>;
  }

  if (cardsDue.length > 0) {
    return (
      <section>
        <center>
          {card._id}
          <Flashcard card={card} remaining={cardsDue.length} />
        </center>
        <br />
      </section>
    );
  }
}

export default Review;
