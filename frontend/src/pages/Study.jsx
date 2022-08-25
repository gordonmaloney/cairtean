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
import cardService from "../features/cards/cardService";

export const Study = ({ forgottenOnly, level }) => {
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
  }, [isError, user]);

  //set sessionCards
  const [sessionCards, setSessionCards] = useState([]);

  !level &&
    cards.length > 0 &&
    cards.length !== sessionCards.length &&
    setSessionCards(cards);

  level &&
    cards.length > 0 &&
    cards.filter((card) => card.level == level).length !==
      sessionCards.length &&
    setSessionCards(cards.filter((card) => card.level == level));

  const forgottenCards = cards.filter(
    (card) =>
      card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
      card.lastForgotten < new Date().getTime()
  );

  if (sessionCards.length < 1) {
    return (
      <>
        {cards.length == 0 && !isLoading ? (
          <>
            <p
              style={{
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Oops! It looks like you don't have any cards yet. To get started,{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("../addLanding")}
              >
                <u>add some cards to your deck</u>
              </span>
              . You can either add them individually, or in bulk to help study
              with Duolingo.
            </p>
          </>
        ) : (
          <>
            Loading...
            {
              //<Review cards={[{ front: "", date: 1110327986575 }]} noRemaining />
            }
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Review
        cards={!forgottenOnly && sessionCards}
        forgottenCards={forgottenCards}
        level
      />
    </>
  );
};
