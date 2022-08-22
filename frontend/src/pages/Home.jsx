import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import { getMe, updateStreak } from "../features/auth/authSlice";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardEvent } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Review from "./Review";
import { Menu } from "./Menu";
import AboutModal from "./AboutModal";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  let today = new Date(new Date().setHours(0, 0, 0, 1));

  useEffect(() => {
    user && dispatch(getMe());
  }, [navigate]);

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
  }, [navigate, isError]);

  //reset streak
  useEffect(() => {
    if (
      user &&
      user.streak != 0 &&
      user?.last < new Date(today).setDate(new Date().getDate() - 1)
    ) {
      console.log("conditional met - resetting streak");
      let updatedUserData = {
        ...user,
        streak: 0,
      };

      dispatch(updateStreak(updatedUserData));
    }
  }, [navigate]);

  if (isLoading || !user) {
    return <>Loading...</>;
  }

  return (
    <>
      <section className="heading">
        <h1>Fàilte, {user && user.name}</h1>
      </section>

      <section className="content">
        <p
          style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}
        >
          <br />
          You have got {cards && cards.length} cards in your deck
          {cards.length == 0 ? (
            <>
              <br />
              <br />
              To start studying,{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("./addLanding")}
              >
                <u>add some cards to your deck</u>
              </span>
              . You can either add them individually, or in bulk to help study
              with Duolingo.
            </>
          ) : (
            <>
              <br />
              <br />
              Your current streak is{" "}
              {user.streak == 1 ? `${user.streak} day` : `${user.streak} days`}
              <br />
              <br />
              {user.last > new Date(today).setDate(new Date().getDate() - 1) &&
              user.last < new Date(today).setDate(new Date().getDate() + 1)
                ? "You have studied today - good work!"
                : "You haven't studied yet today"}
              <br />
              <br />
              <AboutModal />
            </>
          )}
        </p>
      </section>
    </>
  );
};
