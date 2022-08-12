import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCards, reset } from "../features/cards/cardSlice";
import Spinner from "../components/Spinner";

import Review from "./Review";

export const Home = () => {
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
  }, [user]);

  if (isLoading || cards.length < 1 || !user) {
    return <Spinner />;
  }

  console.log(cards);

  return (
    <>
      <section className="heading">
        <h1>Fàilte, {user && user.name}</h1>
      </section>

      <section className="content">
        you have got {cards && cards.length} cards in your deck
      </section>

      <Review cards={cards} />

    </>
  );
};
