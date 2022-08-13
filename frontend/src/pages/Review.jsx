import { useState } from "react";
import Flashcard from "../components/Flashcard";

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
