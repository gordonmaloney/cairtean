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
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardEvent } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Review from "./Review";
import { Menu } from "./Menu";

export const Home = () => {


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
  }, [user, isError]);

  if (isLoading || cards.length < 1 || !user) {
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

      <Review cards={cards} />
    </>
  );
};
