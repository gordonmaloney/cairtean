import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCard } from "../features/cards/cardSlice";

function Flashcard({ card, remaining }) {
  const [threeBox, setThreeBox] = useState(false);

  const dispatch = useDispatch();



  const handleUpdate = (updatedCard) => {

    console.log("updated card: ", updatedCard)

    dispatch(updateCard(updatedCard));
  };

  const handleWrong = (card) => {
    const updatedCard = { ...card };
    updatedCard.date = parseInt(new Date().setHours(0, 0, 0, 1).valueOf())
    updatedCard.delay = 0;
    updatedCard.reviews++;

    handleUpdate(updatedCard);
  };

  const handleCorrect = (card) => {
    const updatedCard = { ...card };

    console.log(card)

    let newDate = new Date().setDate(
      new Date().getDate() + (parseInt(card.delay) + 1) * 2
    );

    console.log("new date: ", newDate)

    updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
    updatedCard.delay = parseInt((card.delay + 1)) * 1.5;
    updatedCard.reviews++;

    handleUpdate(updatedCard);
  };

  const handleEasy = (card) => {
    const updatedCard = { ...card };

    let newDate = new Date().setDate(
      new Date().getDate() + (parseInt(card?.delay) + 2) * 2
    );

    updatedCard.date = new Date(newDate).setHours(0, 0, 0, 1);
    updatedCard.delay = parseInt((card.delay + 2)) * 2;
    updatedCard.reviews++;
    handleUpdate(updatedCard);
  };

  return (
    <>
      <div className="flashcardContainer">
        <div className="flashcardHeader">
          <div style={{ marginRight: "20px" }}>{remaining} remaining</div>
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
            {threeBox && "Correct"}
          </div>
          <div
            onClick={() => {
              setThreeBox(!threeBox);
              handleEasy(card)
            }}
            className={threeBox ? "onebox r2" : "onebox r1"}
          >
            {threeBox && "Easy"}
          </div>
        </div>
      </div>
      date: {card.date}<br/>
      delay: {card.delay}

    </>
  );
}

export default Flashcard;
