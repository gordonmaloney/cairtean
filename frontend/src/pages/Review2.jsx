import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import Flashcard from "../components/Flashcard";

export const Review2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get user
  const { user } = useSelector((state) => state.auth);

  //get cards
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCards());
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  const [sessionCards, setSessionCards] = useState([]);

  useEffect(() => {
    setSessionCards(cards.filter((card) => card.tag == "hard"));
  }, [cards]);

  const [index, setIndex] = useState(0);


  if (!sessionCards.length > 0) {
    return <>Loading...</>;
  }
  return (
    <div>
      Review2
      <br />
      user: {user.name}
      <br />
      total cards: {cards.length}
      <br />
      total cards: {sessionCards.length}
      <br /><br/>
      session card index: {sessionCards[index].front}
<br />
      <button onClick={() => {setIndex(prev => prev+1)}}>Increment index</button>

      <Flashcard card={sessionCards[index]} />
    </div>
  );
};
