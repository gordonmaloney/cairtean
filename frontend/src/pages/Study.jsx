import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import { updateStreak } from "../features/auth/authSlice";

import Review from "./Review";

export const Study = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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
  }, [isError, user, dispatch]);

  //set sessionCards
  const [sessionCards, setSessionCards] = useState([]);
  cards.length > 0 &&
    cards.length !== sessionCards.length &&
    setSessionCards(cards);


  if (sessionCards.length < 1) {
    return (
      <>Loading...
        <Review cards={[{ front: "", date: 1110327986575 }]} noRemaining />
      </>
    );
  }


  return (
    <>
      <Review cards={sessionCards} />
    </>
  );
};
