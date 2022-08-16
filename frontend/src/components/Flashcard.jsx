import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../features/cards/cardSlice";
import { updateStreak } from "../features/auth/authSlice";
import Fab from "@mui/material/Fab";
import { Grid } from "@mui/material";

function Flashcard({ cardOne, remaining, pushWrongCard, incrementIndex }) {
  const [card, setCard] = useState(cardOne);

  useEffect(() => {
    setCard(cardOne)
  }, [cardOne])

  const [threeBox, setThreeBox] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = (updatedCard) => {
    dispatch(updateCard(updatedCard));

    //check streak
    let today = new Date(new Date().setHours(0, 0, 0, 1));

    if (user.last == new Date(today).setDate(new Date().getDate() - 1)) {
      let updatedUserData = {
        ...user,
        streak: parseInt(user.streak) + 1,
        last: new Date().setHours(0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    } else if (user.last < new Date(today).setDate(new Date().getDate() - 1)) {
      let updatedUserData = {
        ...user,
        streak: 1,
        last: new Date().setHours(0, 0, 1).valueOf(),
      };

      dispatch(updateStreak(updatedUserData));
    } else {
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

    pushWrongCard(updatedCard);
    handleUpdate(updatedCard);
  };

  const handleCorrect = (card) => {
    const updatedCard = { ...card };

    let newDate = new Date().setDate(
      new Date().getDate() + (parseInt(card?.delay) * 1.6) + 1
    );
    let tomorrow = new Date().setDate(new Date().getDate() + 1);

    if (card.tag != "hard") {
      updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
      updatedCard.delay = (parseInt(card?.delay) * 1.6) + 1;
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
      new Date().getDate() + (parseInt(card?.delay) * 2.6) + 2
    );
    let tomorrow = new Date().setDate(new Date().getDate() + 1);

    if (card.tag != "hard") {
      updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
      updatedCard.delay = (parseInt(card?.delay)  * 2.6) + 2;
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
      <Grid container>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6}>
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
            <br />
            <br />
            {card.front != "" && (
              <>
                Wrong - retry
                <br />
                Correct - {(parseInt(card.delay) * 1.6) + 1} days
                <br />
                Easy - {(parseInt(card?.delay) * 2.6) + 2} days
              </>
            )}
          </div>
        </Grid>
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
                <Fab
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={() => markHard(card)}
                >
                  hard
                </Fab>

                <Fab
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={() => markKnown(card)}
                >
                  known
                </Fab>
              </>
            ) : (
              <>
                <Fab
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onClick={() => unTag(card)}
                >
                  untag
                </Fab>
              </>
            )}
          </center>
        </Grid>
      </Grid>
    </>
  );
}

export default Flashcard;
