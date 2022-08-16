import React from "react";
import {
  getCards,
  reset,
  isError,
  isLoading,
  deleteCard,
} from "../features/cards/cardSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { KeyboardEvent } from "react";
import { Box } from "@mui/system";

export const Browse = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (KeyboardEvent.key === "Tab" || KeyboardEvent.key === "Shift")
    ) {
      return;
    }
    setDrawer((prev) => !prev);
  };

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

  const onEdit = (card) => {
    setDrawer(true);

    console.log(card)

    dispatch(deleteCard({...card}));
  };

  return (
    <div>
      <center>
        <table>
          <tbody>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Next due</th>
              <th>Tag</th>
              <th style={{ border: 0 }}></th>
            </tr>

            {[...cards]
              .sort((a, b) => a.date - b.date)
              .map((card, index) => {
                return (
                  <tr key={index}>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                    <td>{new Date(card.date).toLocaleDateString("en-UK")}</td>
                    <td>{card.tag ? card.tag : "-"}</td>
                    <td style={{ border: 0 }}>
                      <div onClick={() => onEdit(card)}>edit</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </center>

      <SwipeableDrawer
        anchor="right"
        open={drawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <>
            <br />
            test test test
            <br />
          </>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
