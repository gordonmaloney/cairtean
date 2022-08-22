import React from "react";
import { Grid } from "@mui/material";
import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import AddCards from "./AddCards";
import BulkAddCards from "./BulkAddCards";
import * as MUIStyle from "../MUIStyles";

export const AddLanding = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      return;
    }
    setDrawer((prev) => !prev);
  };

  const [field, setField] = useState("");

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div
            onClick={() => {
              setDrawer(true);
              setField("add");
            }}
          >
            <MenuCard mini content={<h3>Add individual cards</h3>} />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div
            onClick={() => {
              setDrawer(true);
              setField("bulk");
            }}
          >
            <MenuCard
              mini
              content={<h3>Bulk add cards from Duolingo levels</h3>}
            />
          </div>
        </Grid>
      </Grid>

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

            {field == "add" && <AddCards />}
            {field == "bulk" && <BulkAddCards />}
          </section>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
