import React from "react";
import {
  getCards,
  reset,
  isError,
  isLoading,
  deleteCard,
  updateCard,
  patchCard,
} from "../features/cards/cardSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { TextField, Button, Grid, FormLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import * as MUIStyle from "../MUIStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Browse = () => {
  const [cardData, setCardData] = useState({
    front: "",
    back: "",
    date: "",
    delay: 0,
    reviews: 0,
    tag: "",
  });

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
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

    setCardData(card);
  };

  const handleUpdate = () => {
    dispatch(updateCard(cardData));

    toggleDrawer(false);
    setDrawer(false);
  };

  const handleDelete = () => {
    dispatch(patchCard(cardData));

    toggleDrawer(false);
    setDrawer(false);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [level, setLevel] = useState("");

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
                      <Button
                        size="small"
                        variant="contained"
                        sx={MUIStyle.EditButton}
                        onClick={() => onEdit(card)}
                      >
                        edit
                      </Button>
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
          <section
            style={{
              width: "80%",
              minWidth: "280px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              sx={{ ...MUIStyle.ButtonStyleCancel, margin: 1 }}
              size="small"
              onClick={() => {
                toggleDrawer(false);
                setDrawer(false);
              }}
            >
              Back
            </Button>
            <h2>Edit card:</h2> <br />
            <br />
            <Grid container spacing={2}>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormLabel sx={MUIStyle.LabelStyle} htmlFor="front">
                  Front
                </FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={MUIStyle.TextFieldStyle}
                  type="text"
                  name="front"
                  id="front"
                  value={cardData.front}
                  placeholder="Enter the front side of the card here"
                  onChange={(e) =>
                    setCardData({ ...cardData, front: e.target.value })
                  }
                />
              </Grid>

              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormLabel sx={MUIStyle.LabelStyle} htmlFor="back">
                  Back
                </FormLabel>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  sx={MUIStyle.TextFieldStyle}
                  type="text"
                  name="back"
                  id="back"
                  value={cardData.back}
                  placeholder="Enter the back of the card here"
                  onChange={(e) =>
                    setCardData({ ...cardData, back: e.target.value })
                  }
                />
              </Grid>

              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormLabel sx={MUIStyle.LabelStyle} htmlFor="back">
                  Tag
                </FormLabel>
              </Grid>
              <Grid item xs={10}>
                {cardData.tag && (
                  <>
                    <Button disabled sx={MUIStyle.EditButton}>
                      {cardData.tag}
                    </Button>
                    <Button
                      sx={{
                        ...MUIStyle.ButtonStyleCancel,
                        padding: "5px",
                        marginX: 2,
                        minWidth: 0,
                        height: "35px",
                        width: "35px",
                        borderRadius: "100px",
                      }}
                      onClick={() => setCardData({ ...cardData, tag: "" })}
                    >
                      x
                    </Button>
                  </>
                )}
              </Grid>

              <Grid item xs={12}>
                <center>
                  <Button
                    sx={MUIStyle.ButtonStyle}
                    variant="contained"
                    onClick={() => handleUpdate()}
                    disabled={!cardData.front || !cardData.back}
                  >
                    Update Card
                  </Button>
                </center>
              </Grid>

              <Grid item xs={12}>
                <center>
                  <Button
                    sx={MUIStyle.ButtonStyleCancel}
                    variant="contained"
                    onClick={() => {
                      setOpen(true);
                    }}
                    disabled={!cardData.front || !cardData.back}
                  >
                    Delete Card
                  </Button>
                </center>
              </Grid>
            </Grid>
          </section>
        </Box>
      </SwipeableDrawer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...MUIStyle.ModalStyle, backgroundColor: "#fffffe" }}>
          <h3>Are you sure?</h3>
          <br />
          <br />
          <p>
            Are you sure you want to remove this card? This cannot be undone.
          </p>
          <br />
          <br />
          <center>
            <Button
              variant="contained"
              sx={MUIStyle.ButtonStyle}
              onClick={() => {
                handleDelete();
                setOpen(false);
              }}
            >
              Confirm
            </Button>
            <br />
            <br />
            <Button
              sx={MUIStyle.ButtonStyleCancel}
              variant="contained"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
};
