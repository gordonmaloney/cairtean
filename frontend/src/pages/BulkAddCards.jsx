import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";

function BulkAddCards() {
  const [cardsData, setCardsData] = useState([
    {back: "tunnag", front: "duck", level: "Intro"},
    {back: "snog", front: "nice", level: "Intro"},
    {back: "seo", front: "This is", level: "Intro"},
    {back: "piseag", front: "kitten", level: "Intro"},
    {back: "muc", front: "pig", level: "Intro"},
    {back: "Mòrag", front: "Morag", level: "Intro"},
    {back: "mòr", front: "big", level: "Intro"},
  ]);

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(createCardsBulk({ cardsData }));
  };

  return (
    <section className="form">
      <button className="btn btn-block" onClick={onSubmit}>
        Bulk Add Cards
      </button>
    </section>
  );
}

export default BulkAddCards;
