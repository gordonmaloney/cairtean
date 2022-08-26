import { Select, MenuItem, Button, Grid } from "@mui/material";
import { WORDS } from "./WORDS";
import * as MUIStyle from "../MUIStyles";
import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import { Study } from "./Study";

export const StudyLanding = () => {
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
  
  cards.length > 0 &&
    cards.length !== sessionCards.length &&
    setSessionCards(cards);

  const [forgottenCards, setForgottenCards] = useState([]);

  if (
    cards.length > 0 &&
    forgottenCards.length !==
      cards.filter(
        (card) =>
          card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
          card.lastForgotten < new Date().getTime()
      ).length
  ) {
    setForgottenCards(
      cards.filter(
        (card) =>
          card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
          card.lastForgotten < new Date().getTime()
      )
    );
  }

  //const levels = Array.from(new Set(WORDS.map((word) => word.level)));
  const [levels, setLevels] = useState([]);

  if (
    cards &&
    levels.length != Array.from(new Set(cards.map((word) => word.level))).length
  ) {
    setLevels(Array.from(new Set(cards.map((word) => word.level))));
  }

  const [level, setLevel] = useState("Select a level");

  const [content, setContent] = useState("landing");

  if (isLoading) {
    return <>Loading...</>;
  }
  if (content == "landing") {
    return (
      <div>
        <h3>How would you like to study?</h3>
        <br />
        <br />

        <Grid container>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <div onClick={() => navigate('../study')}>
              <MenuCard
                mini
                content={
                  <div>
                    <h3>Study all due cards</h3>
                    <br />
                    <br />
                    <p>Study all the cards you have due for today</p>
                  </div>
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} md={3}></Grid>

          <Grid item xs={12} md={6}>
            <Link to="../studyForgotten">
              <MenuCard
                content={
                  <div>
                    <h3>Study forgotten cards</h3>
                    <br />
                    <br />
                    {!isLoading && forgottenCards.length == 0 ? (
                      <p>
                        You've not gotten any cards wrong yet today. When you
                        do, you can come here to review them.
                      </p>
                    ) : (
                      <p>
                        You got{" "}
                        {forgottenCards.length == 1
                          ? "1 card"
                          : `${forgottenCards.length} cards`}{" "}
                        wrong today.
                        <br />
                        <br />
                        Why not revise them to make sure you remember them?
                      </p>
                    )}
                  </div>
                }
              />
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <MenuCard
              content={
                <div>
                  <h3>Study from level</h3>
                  <br />
                  <br />

                  {console.log(levels)}
                  {!isLoading && levels.length < 2 && (
                    <p>
                      Once you add words from levels in Duolingo, you can focus
                      your study on them here.
                    </p>
                  )}

                  {!isLoading && levels.length > 1 && (
                    <Grid container>
                      <Grid item xs={6}>
                        <p style={{ textAlign: "left" }}>
                          Pick a specifc Duolingo level to study the vocab from:
                        </p>
                      </Grid>

                      <Grid item xs={6}>
                        <Select
                          size="small"
                          sx={{
                            ...MUIStyle.SelectStyle,
                            backgroundColor: MUIStyle.offwhite,
                          }}
                          id="levelSelector"
                          label="Select a level"
                          value={level ? level : "Select a level"}
                          onChange={(e) => {
                            setLevel(e.target.value);
                          }}
                        >
                          <MenuItem value="Select a level">
                            Select a level
                          </MenuItem>
                          {levels.length > 0 &&
                            levels.map((level, index) => (
                              <MenuItem key={index} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                        </Select>
                        <br />
                        <Button
                          onClick={() => navigate(`../studyLevel/${level}`)}
                          disabled={level == "Select a level"}
                          sx={{ ...MUIStyle.ButtonStyle, marginTop: "5px" }}
                        >
                          Study
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </div>
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  if (content == "study") {
    return (
      <>
        <Button
          onClick={() => {
            setContent("landing");
          }}
          size="small"
          sx={{
            ...MUIStyle.ButtonStyleCancel,
            float: "left",
            marginTop: "-50px",
          }}
        >
          Back
        </Button>

        <Study />
      </>
    );
  }

  if (content == "forgotten") {
    return (
      <>
        <Button
          onClick={() => {
            setContent("landing");
          }}
          size="small"
          sx={{
            ...MUIStyle.ButtonStyleCancel,
            float: "left",
            marginTop: "-50px",
          }}
        >
          Back
        </Button>

        <Study forgottenOnly />
      </>
    );
  }

  if (content == "level") {
    return (
      <>
        <Button
          onClick={() => {
            setContent("landing");
          }}
          size="small"
          sx={{
            ...MUIStyle.ButtonStyleCancel,
            float: "left",
            marginTop: "-50px",
          }}
        >
          Back
        </Button>

        <Study level={level} />
      </>
    );
  }
};
