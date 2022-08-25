import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard, patchCard } from "../features/cards/cardSlice";
import { updateStreak } from "../features/auth/authSlice";
import Fab from "@mui/material/Fab";
import { Box, Button, Grid, Snackbar, SnackbarContent } from "@mui/material";
import * as MUIStyle from "../MUIStyles";
import Tooltip from "@mui/material/Tooltip";
import { FlashcardMicroDrawer } from "./FlashcardMicroDrawer";
import { TextField } from "@mui/material";
function Flashcard({ cardOne, remaining, pushWrongCard, incrementIndex }) {
  const [card, setCard] = useState(cardOne);

  useEffect(() => {
    setCard(cardOne);
  }, [cardOne]);

  //typed answer logic
  const [typeAnswer, setTypeAnswer] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [sracan, setSracan] = useState(true);

  //remove sracan
  const removeSracan = (string) => {
    return [...string]
      .map((letter) => {
        return letter == "à"
          ? "a"
          : letter == "è"
          ? "e"
          : letter == "ì"
          ? "i"
          : letter == "ò"
          ? "o"
          : letter == "ù"
          ? "u"
          : letter;
      })
      .join("");
  };

  //snack logic
  const [snackOpen, setSnackOpen] = useState(false);
  const handleClick = () => {
    setSnackOpen(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleTypedSubmit = () => {
    console.log(typedAnswer, card.back);

    let processedAnswer;
    let processedBack;

    if (sracan) {
      processedAnswer = removeSracan(typedAnswer.toLowerCase());
      processedBack = removeSracan(card.back.toLowerCase());
    } else {
      processedAnswer = typedAnswer.toLowerCase();
      processedBack = card.back.toLowerCase();
    }

    if (processedAnswer == processedBack) {
      setSnackbarMsg("Correct!");
      setSnackOpen(true);
      setCorrect(true);
      setThreeBox(true);
      setTimeout(() => {
        setThreeBox(false);
        handleCorrect(card);
        setTypedAnswer("");
        setCorrect(false);
      }, 1500);
    } else if (processedAnswer != processedBack) {
      setSnackbarMsg("Try again...");
      setSnackOpen(true);
      setIncorrect(true);
      setTimeout(() => {
        setIncorrect(false);
      }, 1500);
    }
  };

  const handleTypedGiveUp = () => {
    console.log("giving up...");

    setThreeBox(true);
  };

  const [threeBox, setThreeBox] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = (updatedCard) => {
    dispatch(updateCard(updatedCard));

    //check streak
    let today = new Date(new Date().setHours(0, 0, 0, 1));

    console.log(
      user.last > new Date(today).setDate(new Date().getDate() - 1) &&
        user.last < new Date(today).setDate(new Date().getDate())
    );

    if (
      user.last > new Date(today).setDate(new Date().getDate() - 1) &&
      user.last < new Date(today).setDate(new Date().getDate())
    ) {
      //user last between yday 00:01 and today 00:01
      console.log("updating streak + 1");
      let updatedUserData = {
        ...user,
        streak: parseInt(user.streak) + 1,
        last: new Date().valueOf(),
      };
      dispatch(updateStreak(updatedUserData));
    } else if (user.last < new Date(today).setDate(new Date().getDate() - 1)) {
      //user last before yday - set streak to 1
      console.log("resetting streak...");
      let updatedUserData = {
        ...user,
        streak: 1,
        last: new Date().setHours(0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    } else {
      //
      console.log("maintaining streak...");
      let updatedUserData = {
        ...user,
        streak: parseInt(user.streak),
        last: new Date().valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    }

    incrementIndex();
  };

  const { user } = useSelector((state) => state.auth);

  //logging streak conditions
  let userLast = new Date(user.last);
  let todayDate = new Date(new Date().setHours(0, 0, 0, 1));
  let yDayDate = new Date(
    new Date(todayDate).setDate(new Date().getDate() - 1)
  );

  const handleWrong = (card) => {
    const newDate = new Date();

    const updatedCard = { ...card };

    updatedCard.date = newDate.getTime();
    updatedCard.delay = 0;
    updatedCard.reviews++;
    updatedCard.lastForgotten = new Date().getTime();

    pushWrongCard(updatedCard);
    handleUpdate(updatedCard);
  };

  const handleCorrect = (card) => {
    const updatedCard = { ...card };

    let newDate = new Date().setDate(
      new Date().getDate() + parseInt(card?.delay) * 1.6 + 1
    );
    let tomorrow = new Date().setDate(new Date().getDate() + 1);

    if (
      card.tag != "hard" &&
      !(
        card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
        card.lastForgotten < new Date().getTime()
      )
    ) {
      updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
      updatedCard.delay = parseInt(card?.delay) * 1.6 + 1;
    } else {
      updatedCard.date = new Date(tomorrow).setHours(0, 0, 0, 1);
      updatedCard.delay = 1;
    }
    updatedCard.reviews++;

    console.log("updated card: ", updatedCard);
    handleUpdate(updatedCard);
  };

  const handleEasy = (card) => {
    const updatedCard = { ...card };

    let newDate = new Date().setDate(
      new Date().getDate() + parseInt(card?.delay) * 2.6 + 2
    );
    let tomorrow = new Date().setDate(new Date().getDate() + 1);

    if (
      card.tag != "hard" &&
      !(
        card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
        card.lastForgotten < new Date().getTime()
      )
    ) {
      updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
      updatedCard.delay = parseInt(card?.delay) * 2.6 + 2;
    } else if (card.tag == "hard") {
      updatedCard.date = new Date(tomorrow).setHours(0, 0, 0, 1);
      updatedCard.delay = 1;
    }

    updatedCard.reviews++;
    handleUpdate(updatedCard);
  };

  const markHard = () => {
    let updatedCard = { ...card };
    updatedCard.tag = "hard";

    setCard({ ...card, tag: "hard" });
    dispatch(updateCard(updatedCard));
  };

  const markKnown = () => {
    let updatedCard = { ...card };
    updatedCard.tag = "known";
    setCard({ ...card, tag: "known" });

    dispatch(updateCard(updatedCard));
    incrementIndex();
  };

  const unTag = () => {
    let updatedCard = { ...card };
    updatedCard.tag = "";
    setCard({ ...card, tag: "" });

    dispatch(updateCard(updatedCard));
  };

  //bury card
  const buryCard = () => {
    let newDelay = 90 + Math.floor(Math.random() * 90 + 1);
    const updatedCard = { ...card };

    let newDate = new Date().setDate(
      new Date().getDate() + parseInt(card?.delay) + newDelay
    );

    updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
    updatedCard.delay = 1;

    dispatch(updateCard(updatedCard));
    incrementIndex();
  };

  //delete card
  const deleteCard = () => {
    dispatch(patchCard(card));
    incrementIndex();
  };

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={handleCloseSnack}
      >
        <SnackbarContent
          style={{
            backgroundColor:
              snackbarMsg == "Correct!" ? MUIStyle.blue : MUIStyle.purple,
          }}
          message={snackbarMsg}
        />
      </Snackbar>

      <Grid container sx={{ padding: "-20px" }} spacing={0}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6}>
          <>
            <div className="flashcardContainer">
              <div className="flashcardHeader">
                <div style={{ marginRight: "20px" }}>
                  {card.front != "" && <>{remaining} remaining</>}
                </div>
              </div>

              <div className="flashcardBody">
                {card.front}
                {threeBox ? (
                  <>
                    <div
                      style={{
                        height: "10px",
                        borderBottom: "1px solid black",
                        width: "220px",
                        marginBottom: "10px",
                      }}
                    />
                    {card.back}
                  </>
                ) : (
                  <div
                    style={{
                      userSelect: "none",
                      pointerEvents: "none",
                      color: "rgba(1,1,1,0)",
                      backgroundColor: "rgba(0,0,0,0)",
                    }}
                  >
                    <div
                      style={{
                        height: "11px",
                        width: "220px",
                        marginBottom: "10px",
                      }}
                    />
                    .
                  </div>
                )}
              </div>

              <div className="flashcardFooter">
                {!typeAnswer ? (
                  <>
                    <div
                      onClick={() => {
                        setThreeBox(!threeBox);
                      }}
                      className={threeBox ? "threebox hide" : "threebox"}
                    >
                      {!threeBox && "Show Answer"}
                    </div>
                    <div
                      onClick={() => {
                        setThreeBox(!threeBox);
                        handleWrong(card);
                      }}
                      className={threeBox ? "onebox l2" : "onebox l1"}
                    >
                      {threeBox && "Wrong"}
                    </div>
                    <div
                      onClick={() => {
                        setThreeBox(!threeBox);
                        handleCorrect(card);
                      }}
                      className={threeBox ? "onebox c2" : "onebox c1"}
                    >
                      {threeBox && <>Correct</>}
                    </div>
                    <div
                      onClick={() => {
                        setThreeBox(!threeBox);
                        handleEasy(card);
                      }}
                      className={threeBox ? "onebox r2" : "onebox r1"}
                    >
                      {threeBox && "Easy"}
                    </div>
                  </>
                ) : (
                  <TextField
                    sx={{
                      ...MUIStyle.FlashcardTextField,
                      backgroundColor: correct
                        ? MUIStyle.yellow
                        : incorrect
                        ? MUIStyle.purple
                        : MUIStyle.blue,
                    }}
                    type="text"
                    variant="filled"
                    placeholder="Type your answer here..."
                    value={typedAnswer}
                    disabled={threeBox}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleTypedSubmit();
                      }
                    }}
                  />
                )}
              </div>
            </div>
            {typeAnswer && (
              <>
                {!threeBox && (
                  <>
                    <Button
                      variant="contained"
                      sx={MUIStyle.ButtonStyle}
                      disabled={!typedAnswer}
                      onClick={() => handleTypedSubmit()}
                    >
                      Submit
                    </Button>{" "}
                  </>
                )}
                {!threeBox ? (
                  <Button
                    variant="contained"
                    sx={MUIStyle.ButtonStyleCancel}
                    onClick={() => handleTypedGiveUp()}
                  >
                    Give up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={MUIStyle.ButtonStyleCancel}
                    onClick={() => {
                      handleWrong(card);
                      setTypedAnswer("");
                      setThreeBox(false);
                    }}
                  >
                    Next card
                  </Button>
                )}
                <br />
                <br />
                <Button
                  variant="contained"
                  sx={MUIStyle.ButtonStyle}
                  onClick={() => setSracan(!sracan)}
                  size="small"
                >
                  {sracan ? "Don't count accents" : "Count accents"}
                </Button>
                <br />
                <br />
              </>
            )}

            <Button
              variant="contained"
              sx={MUIStyle.ButtonStyle}
              onClick={() => setTypeAnswer(!typeAnswer)}
              size="small"
            >
              Turn typing {typeAnswer ? "off" : "on"}
            </Button>
            <br />
            <br />
            {card.front != "" && !typeAnswer && (
              <p>
                <b>Wrong</b> - retry
                <br />
                <b>Correct</b> - show card again in{" "}
                {card.tag != "hard" &&
                !(
                  card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
                  card.lastForgotten < new Date().getTime()
                )
                  ? parseInt(card?.delay) * 1.6 + 1
                  : 1}{" "}
                days
                <br />
                <b>Easy</b> - show card again in{" "}
                {card.tag != "hard" &&
                !(
                  card.lastForgotten > new Date().setHours(0, 0, 0, 1) &&
                  card.lastForgotten < new Date().getTime()
                )
                  ? parseInt(card?.delay) * 2.6 + 2
                  : 1}{" "}
                days
              </p>
            )}
          </>
        </Grid>

        {/*
        <Grid
          item
          sm={1}
          sx={{ display: { xs: "none", sm: "block", md: "none" } }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <center>
            {card.tag == "" ? (
              <>
                <MUIStyle.CustomTooltip title="Mark card as 'hard'">
                  <Fab sx={MUIStyle.FabHard} onClick={() => markHard(card)}>
                    ?
                  </Fab>
                </MUIStyle.CustomTooltip>

                <MUIStyle.CustomTooltip title="Mark card as 'known'">
                  <Fab sx={MUIStyle.FabKnown} onClick={() => markKnown(card)}>
                    !
                  </Fab>
                </MUIStyle.CustomTooltip>
              </>
            ) : (
              <>
                <MUIStyle.CustomTooltip title="Remove tag from card">
                  <Fab sx={MUIStyle.FabKnown} onClick={() => unTag(card)}>
                    -
                  </Fab>
                </MUIStyle.CustomTooltip>
              </>
            )}
          </center>
        </Grid>
            */}
      </Grid>

      <FlashcardMicroDrawer
        card={card}
        markKnown={markKnown}
        markHard={markHard}
        unTag={unTag}
        buryCard={buryCard}
        deleteCard={deleteCard}
      />
    </>
  );
}

export default Flashcard;
