import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { MenuCard } from "../components/MenuCard";

export const AddLanding = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <MenuCard content={<>Add individual cards</>} link="../add" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MenuCard
            content={<>Bulk add cards from Duolingo levels</>}
            link="../bulk"
          />
        </Grid>
      </Grid>
    </div>
  );
};
