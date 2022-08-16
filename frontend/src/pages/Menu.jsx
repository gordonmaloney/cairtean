import { useState } from "react";
import { Grid } from "@mui/material";
import { MenuCard } from "../components/MenuCard";

import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Animicon } from "../components/AnimIcon";

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
        <h1 onClick={() => navigate('../')}>Càirtean</h1>
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
                <Grid container>
                  <Grid item xs={6}>
                    Review your cards and maintain your streak!
                  </Grid>
                  <Grid item xs={6}>
                    <Animicon icon="flashcards" canvas forceLoop={forceLoop} />
                  </Grid>
                </Grid>
              </div>
            }
            link="../study"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard
            content={
              <>
                <h3>Add cards</h3>
                <br />
                <br />
                Add new cards individually, or add cards in bulk from levels in
                the Duolingo course.
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
                Browse your full collection of cards, as well as edit or delete
                them.
              </>
            }
            link="../browse"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div onClick={onLogout}>
            <MenuCard content={<><h3>Log out</h3>
            <br/><br/>
            All good things must come to an end 🥺<br/><br/>Come back soon!</>} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
