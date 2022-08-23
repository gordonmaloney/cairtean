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
import * as MUIStyle from "../MUIStyles";
import { Grid } from "@mui/material";

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
        
        {/*
        new dashboard style - not ready
        <div
          style={{
            marginTop: "30px",
            width: "80%",
            minWidth: "280px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <div
                style={{
                  padding: "20px",
                  margin: '10px',
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>Your deck has</p>
                <br />
                <h1>64 cards</h1>{" "}
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div
                style={{
                  padding: "20px",
                  margin: '10px',
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>Your streak is</p>
                <br />
                <h1>9 days</h1>{" "}
              </div>
            </Grid>
            
            
            <Grid item sm={6} xs={12}>
              <div
                style={{
                  padding: "20px",
                  margin: '10px',
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>You've done</p>
                <br />
                <h1>100 reviews</h1>{" "}
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <div
                style={{
                  padding: "20px",
                  margin: '10px',
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <p style={{ textAlign: "left" }}>You have</p>
                <br />
                <h1>studied today</h1>{" "}
              </div>
            </Grid>
          </Grid>
        </div>
              */}

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
              You are on a {user.streak} day streak
              <br />
              <br />
              You have a total of{" "}
              {cards
                .map((card) => card.reviews)
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue
                )}{" "}
              reviews
              <br />
              <br />
              {user.last > new Date(today).setDate(new Date().getDate() - 1) &&
              user.last < new Date(today).setDate(new Date().getDate() + 1)
                ? "You have studied today - good work!"
                : "You haven't studied yet today"}
              <br />
              <br />
              <Button
                variant="contained"
                style={MUIStyle.ButtonStyle}
                size="large"
                onClick={() => navigate("../study")}
              >
                Start studying
              </Button>
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
