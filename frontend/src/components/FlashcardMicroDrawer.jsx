import { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import * as MUIStyles from "../MUIStyles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useWindowDimensions from "./useWindowDimensions";

export const FlashcardMicroDrawer = ({ card, markHard, markKnown, unTag }) => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      return;
    }
    setDrawer((prev) => !prev);
  };




  const { width } = useWindowDimensions();
console.log(width)

  const gridSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingX: "20px",
    paddingY: "30px",
    justifyContent: width > 450 ? "space-between" : "space-evenly",
    marginTop: width < 450 && "-20px",
    height: width > 450 ? "30vh" : "40vh",
  };


  return (
    <div>
      <Fab
        style={{ position: "fixed", right: width > 450 ? 100 : "calc(50vw - 45px)", bottom: 100 }}
        onClick={() => setDrawer(!drawer)}
        sx={MUIStyles.FabKnown}
      >
        <AddIcon />
      </Fab>

      <SwipeableDrawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{ style: { height: width > 450 ? "30vh" : "40vh", marginTop: width > 450 ? "70vh" : "60vh" } }}
        BackdropProps={{ invisible: true }}
      >
        <Box
          sx={{ width: "100vw", height: width > 450 ? "30vh" : "40vh" }}
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
                <Grid item xs={6} sx={gridSx}>
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
                <Grid item xs={6} sx={gridSx}>
                  <h3>Tag card as 'known'</h3>
                  <p>
                    This means you know the card, and won't see it in your daily reviews.
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
          </Grid>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
