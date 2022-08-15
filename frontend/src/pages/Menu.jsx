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
        <h1>Cairtean</h1>
      </center>



      <Grid container sx={{ width: "80%", marginX: "auto", minWidth: "300px" }}>
        <Grid item xs={12} sm={6}>
          <MenuCard
            content={
              <div
                onMouseEnter={() => setForceLoop(true)}
                onMouseLeave={() => setForceLoop(false)}
              >
                <center>
                  <h3>Study</h3>
                </center>

                <center>
                  <Animicon icon="flashcards" canvas forceLoop={forceLoop} />
                </center>
              </div>
            }
            link="../study"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard content={<>Add cards</>} link="../addLanding" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard content={<>Browse cards</>} link="../browse" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div onClick={onLogout}>
            <MenuCard content={<>Log out</>} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
