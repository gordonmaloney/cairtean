import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCardsBulk } from "../features/cards/cardSlice";

function BulkAddCards() {
  const [cardsData, setCardsData] = useState([
    {
      front: "bulk1",
      back: "bulk1",
    },
    {
      front: "bulk2",
      back: "bulk2",
    },
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
