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

export const Review3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  let today = new Date(new Date().setHours(0, 0, 0, 1));

  //reset streak
  useEffect(() => {
    if (user && user.last < new Date(today).setDate(new Date().getDate() - 1)) {
      let updatedUserData = {
        ...user,
        streak: 0,
      };

      dispatch(updateStreak(updatedUserData));
    }
  }, []);

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
  }, [isError]);

  //set sessionCards
  const [sessionCards, setSessionCards] = useState([]);
  cards.length > 0 &&
    cards.length !== sessionCards.length &&
    setSessionCards(cards);

  if (sessionCards.length < 1 || !user) {
    return (
      <>


        {" "}
        <section className="heading">
          <h1>Fàilte, {user && user.name}</h1>
        </section>
        <section className="content">
          "Loading..."
          <br />
          <br />
          "Loading..."
          <br />
          "Loading..."
        </section>
        <Review cards={[{ front: "", date: 1110327986575 }]} noRemaining />
      </>
    );
  }

  return (
    <>
      <section className="heading">
        <h1>Fàilte, {user && user.name}</h1>
      </section>

      <section className="content">
        you have got {cards && cards.length} cards in your deck
        <br />
        <br />
        your current streak is{" "}
        {user.streak == 1 ? `${user.streak} day` : `${user.streak} day`}
        <br />
        {user.last > new Date(today).setDate(new Date().getDate() - 1) &&
        user.last < new Date(today).setDate(new Date().getDate() + 1)
          ? "You have studied today - good work!"
          : "You haven't studied yet today"}
      </section>

      <Review cards={sessionCards} />
    </>
  );
};
