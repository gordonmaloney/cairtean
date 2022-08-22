import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../features/cards/cardSlice";
import { updateStreak } from "../features/auth/authSlice";
import Fab from "@mui/material/Fab";
import { Grid } from "@mui/material";
import * as MUIStyle from "../MUIStyles";
import Tooltip from "@mui/material/Tooltip";
import { FlashcardMicroDrawer } from "./FlashcardMicroDrawer";

function Flashcard({ cardOne, remaining, pushWrongCard, incrementIndex }) {
  const [card, setCard] = useState(cardOne);

  useEffect(() => {
    setCard(cardOne);
  }, [cardOne]);

  const [threeBox, setThreeBox] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = (updatedCard) => {
    dispatch(updateCard(updatedCard));

    //check streak
    let today = new Date(new Date().setHours(0, 0, 0, 1));

    if (
      user.last > new Date(today).setDate(new Date().getDate() - 1) &&
      user.last < new Date(today).setDate(new Date().getDate())
    ) {
      //user last between yday 00:01 and today 00:01
      console.log("updating streak + 1");
      let updatedUserData = {
        ...user,
        streak: parseInt(user.streak) + 1,
        last: new Date().setHours(0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    } else if (user.last < new Date(today).setDate(new Date().getDate() - 1)) {
      //user last before yday - set streak to 1
      let updatedUserData = {
        ...user,
        streak: 1,
        last: new Date().setHours(0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    } else {
      //
      let updatedUserData = {
        ...user,
        streak: parseInt(user.streak),
        last: new Date().setHours(0, 0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    }

    incrementIndex();
  };

  const { user } = useSelector((state) => state.auth);

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
    } else if (card.tag == "hard") {
      updatedCard.date = new Date(tomorrow).setHours(0, 0, 0, 1);
      updatedCard.delay = 1;
    }
    updatedCard.reviews++;

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

    console.log(updatedCard);
    dispatch(updateCard(updatedCard));
    incrementIndex();
  };

  const unTag = () => {
    let updatedCard = { ...card };
    updatedCard.tag = "";
    setCard({ ...card, tag: "" });

    dispatch(updateCard(updatedCard));
  };

  return (
    <>
      <Grid container sx={{ padding: "-20px" }} spacing={0}>
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
              </div>
            </div>
            <br />
            {card.front != "" && (
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
      />
    </>
  );
}

export default Flashcard;
