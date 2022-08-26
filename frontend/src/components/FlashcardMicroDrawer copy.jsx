import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import * as MUIStyles from "../MUIStyles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import useWindowDimensions from "./useWindowDimensions";
import Modal from "@mui/material/Modal";

export const FlashcardMicroDrawer = ({
  card,
  markHard,
  markKnown,
  unTag,
  buryCard,
  deleteCard,
}) => {
  const [drawer, setDrawer] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      return;
    }
    setDrawer((prev) => !prev);
  };

  const { width } = useWindowDimensions();

  const gridSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingX: width > 450 ? "30px" : "10px",
    paddingY: width > 450 ? "20px" : "10px",
    justifyContent: width > 450 ? "space-between" : "space-evenly",
    height: width > 450 ? "25vh" : "30vh",
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Fab
            style={{
              position: "fixed",
              left: width > 450 ? 100 : 50,
              bottom: 100,
            }}
            onClick={() => setOpen(true)}
            sx={MUIStyles.FabKnown}
          >
            <QuestionMarkIcon />
          </Fab>

          <Fab
            style={{
              position: "fixed",
              right: width > 450 ? 100 : 50,
              bottom: 100,
            }}
            onClick={() => setDrawer(!drawer)}
            sx={MUIStyles.FabKnown}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      <SwipeableDrawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          style: {
            height: width > 900 ? "25vh" : width > 450 ? "50vh" : "60vh",
            marginTop: width > 900 ? "75vh" : width > 450 ? "50vh" : "40vh",
            borderTop: `1px solid ${MUIStyles.black}`,
          },
        }}
        BackdropProps={{ invisible: true }}
      >
        <Box
          sx={{ width: "100vw", height: width > 450 ? "50vh" : "60vh" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Grid container>
            {/* <Grid item xs={5} sx={gridSx}>
              <h3>Card Stats</h3>
              {card.level && <p>This card is from <em>{card.level}</em> on Duolingo.</p>}
              <p>You've studied this card {card.reviews == 1 ? <>{card.reviews} time</> : <>{card.reviews} times</>} so far.</p>
            </Grid> */}

            {card.tag ? (
              <>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} sx={gridSx}>
                  <h3>Untag card</h3>
                  <p>
                    This card is tagged as {card.tag}. This means you'll see the
                    card every day until you untag it.
                  </p>
                  <Button
                    variant="contained"
                    sx={MUIStyles.ButtonStyle}
                    onClick={() => unTag(card)}
                  >
                    Untag card
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} md={3} sx={gridSx}>
                  <h3>Tag card as 'hard'</h3>
                  <p>
                    This means you'll see the card every day until you untag it.
                  </p>
                  <Button
                    variant="contained"
                    sx={MUIStyles.ButtonStyleCancel}
                    onClick={() => markHard(card)}
                  >
                    Tag 'hard'
                  </Button>
                </Grid>
                <Grid item xs={6} md={3} sx={gridSx}>
                  <h3>Tag card as 'known'</h3>
                  <p>
                    This removes the card from your daily
                    reviews.
                  </p>

                  <Button
                    variant="contained"
                    sx={MUIStyles.EditButton}
                    onClick={() => markKnown(card)}
                  >
                    Tag 'Known'
                  </Button>
                </Grid>
              </>
            )}
            <Grid item xs={6} md={3} sx={gridSx}>
              <>
                <h3>Bury Card</h3>
                <p>
                  Shuffle the card back to point between 3 and 6 months from
                  now.
                </p>
                <Button
                  variant="contained"
                  sx={MUIStyles.EditButton}
                  onClick={() => buryCard()}
                >
                  Bury card
                </Button>
              </>
            </Grid>
            <Grid item xs={6} md={3} sx={gridSx}>
              <>
                <h3>Delete Card</h3>
                <p>
                  This <b>cannot be undone</b>, so use with caution!
                </p>
                <Button
                  variant="contained"
                  sx={MUIStyles.ButtonStyleCancel}
                  onClick={() => deleteCard()}
                >
                  Delete card
                </Button>
              </>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...MUIStyles.ModalStyleWide, backgroundColor: MUIStyles.white }}
        >
          <h3>How does this all work, anyway?</h3>
          <br />
          <br />
          <p>
            Long-story short, you{" "}
            <b>
              add cards with vocabulary you want to learn to your deck, and you
              revise them
            </b>
            .
            <br />
            <br />
            When you are adding cards, you can chose to add your own custom
            cards, or add the words from a level in Duolingo. This way, you can
            help <b>reinforce the vocabulary</b> you are learning there.
            <br />
            <br />
            When you're revising, you have three options - 'wrong', 'correct',
            or 'easy'.{" "}
            <b>
              Depending on your answer, Cairtean will show you that word again
              at the optimum time
            </b>{" "}
            - later the better you know it.
            <br />
            <br />
            Alternatively, you can chose to type the answers in - and chose
            whether or not you want the accents to count.
            <br />
            <br />
            This means you can{" "}
            <b>focus your energy in the most efficient way possible</b>
            - revising the words you need to, and not spending too much time on
            the words you already know.
            <br />
            <br />
            For millions of language learners around the world, this method -
            known as{" "}
            <b>'spaced-repetition' has revolutionised vocab learning</b>. If you
            study regularly, I hope it will do the same for you.
            <br />
            <br />
            Cairtean is free to use, but <b>you can support it</b> - and other
            Gaelic learning apps like{" "}
            <a target="_blank" href="facle.netlify.app">
              <u>Facle</u>
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://cuimhne.netlify.app/">
              <u>Cuimhne</u>
            </a>{" "}
            - by making a small donation here:{" "}
            <a target="_blank" href="https://ko-fi.com/gordonmaloney">
              <u>ko-fi.com/gordonmaloney</u>.<br />
              <br /> <b>Mòran taing ❤️</b>
            </a>
          </p>
          <br />
          <br />
          <center>
            <Button
              sx={MUIStyles.ButtonStyleCancel}
              variant="contained"
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
};
