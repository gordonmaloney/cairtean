import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";
import { WORDS } from "./WORDS.js";

function BulkAddCards() {
  const levels = Array.from(new Set(WORDS.map((word) => word.level)));

  const cardsData = [
    { back: "tunnag", front: "duck", level: "Intro" },
    { back: "snog", front: "nice", level: "Intro" },
    { back: "seo", front: "This is", level: "Intro" },
    { back: "piseag", front: "kitten", level: "Intro" },
    { back: "muc", front: "pig", level: "Intro" },
    { back: "Mòrag", front: "Morag", level: "Intro" },
    { back: "mòr", front: "big", level: "Intro" },
  ];

  const dispatch = useDispatch();

  const bulkAddLevel = (level) => {
    console.log(WORDS.filter((word) => word.level == level.target.textContent));

    dispatch(
      createCardsBulk([
        ...WORDS.filter((word) => word.level == level.target.textContent),
      ])
    );
  };

  return (
    <section className="form">
      <button className="btn btn-block">
        Bulk Add Cards
      </button>

      {levels.map((level) => (
        <button onClick={(level) => bulkAddLevel(level)}>{level}</button>
      ))}
    </section>
  );
}

export default BulkAddCards;
