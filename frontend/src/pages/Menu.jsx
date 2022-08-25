import { useState } from "react";
import { Grid } from "@mui/material";
import { MenuCard } from "../components/MenuCard";

import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Animicon } from "../components/AnimIcon";
import AboutModal from "./AboutModal";

export const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const [forceLoop, setForceLoop] = useState(false);

  return (
    <div>
      <center>
        <h1 onClick={() => navigate("../")}>Càirtean</h1>
      </center>

      <Grid container sx={{ width: "80%", marginX: "auto", minWidth: "300px" }}>
        <Grid item xs={12} sm={6}>
          <MenuCard
            content={
              <div
                onMouseEnter={() => setForceLoop(true)}
                onMouseLeave={() => setForceLoop(false)}
              >
                <h3>Study</h3>
                <br />
                <br />
                <p>Review your cards and maintain your streak!</p>
              </div>
            }
            link="../studylanding"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard
            content={
              <>
                <h3>Add cards</h3>
                <br />
                <br />{" "}
                <p>
                  Add new cards individually, or add cards in bulk from levels
                  in the Duolingo course.
                </p>{" "}
                {/*
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "px",
                    display: "inline-flex",
                    borderRadius: "100%",
                    width: "80px",
                    height: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "8px",
                  }}
                >
                  <Animicon icon="cardplus" enter canvas />
                </div>
                */}
              </>
            }
            link="../addLanding"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard
            content={
              <>
                <h3>Browse cards</h3>
                <br />
                <br />
                <p>
                  Browse your full collection of cards, as well as edit or
                  delete them.
                </p>
              </>
            }
            link="../browse"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div onClick={onLogout}>
            <MenuCard
              content={
                <>
                  <h3>Log out</h3>
                  <br />
                  <br />
                  <p>
                    {" "}
                    All good things must come to an end 🥺
                    <br />
                    <br />
                    Come back soon!
                  </p>
                </>
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
