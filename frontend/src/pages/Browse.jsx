import React from "react";
import {
  getCards,
  reset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export const Browse = () => {
  const dispatch = useDispatch();

  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCards());

    return () => {
      dispatch(reset());
    };
  }, [isError]);

  return (
    <div>
      <center>
        <table>
          <tr>
            <th>Front</th>
            <th>Back</th>
            <th>Next due</th>
          </tr>

          {[...cards]
          .sort((a, b) => a.date - b.date)
          .map((card) => (
            <tr>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>{new Date(card.date).toLocaleDateString("en-UK")}</td>
            </tr>
          ))}
        </table>
      </center>
    </div>
  );
};
