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
import Register from "./Register";
import Login from "./Login";
import * as MUIStyle from '../MUIStyles'

export const LoginLanding = () => {
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
      <h1>Fàilte to Càirtean</h1>
      <br />
      <br />
      <p>
        Càirtean is a flashcard app for learning Scottish Gaelic.
        <br />
        <br />
        It is designed to aid students learning with the Duolingo course, but
        also allows you to add your own words. It uses a{" "}
        <a
          target="_blank"
          href="https://blog.wranx.com/the-science-behind-spaced-repetition"
        >
          <u>scientifically proven</u>
        </a>{" "}
        'spaced-repition' algorithm to maximise your retention, and make sure
        you remember what you learn.
        <br />
        <br />
        Càirtean is free to use, but you can support it - and other Gaelic
        learning apps like{" "}
        <a target="_blank" href="facle.netlify.app">
          <u>Facle</u>
        </a>{" "}
        and{" "}
        <a target="_blank" href="https://cuimhne.netlify.app/">
          <u>Cuimhne</u>
        </a>{" "}
        - by making a small donation here:{" "}
        <a target="_blank" href="https://ko-fi.com/gordonmaloney">
          <u>ko-fi.com/gordonmaloney</u>. Mòran taing ❤️</a>
      </p>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <div
            onClick={() => {
              setDrawer(true);
              setField("login");
            }}
          >
            <MenuCard
              mini
              content={
                <>
                  <h3>Log in</h3>
                  <br />
                  <br />
                  If you already have an account, log in here
                </>
              }
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div
            onClick={() => {
              setDrawer(true);
              setField("register");
            }}
          >
            <MenuCard
              mini
              content={
                <>
                  <h3>Sign up</h3>
                  <br />
                  <br />
                  If you don't have an account, register here for free.
                </>
              }
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
          <Button
              onClick={() => {
                toggleDrawer(false);
                setDrawer(false);
              }}
              size="small"
              sx={{...MUIStyle.ButtonStyleCancel, margin: 1}}
            >
              Back
            </Button>
            
          <section
           className="drawerContainer"
          >
            

            {field == "login" && <Login />}
            {field == "register" && <Register />}
          </section>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};
