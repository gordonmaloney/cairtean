import React from "react";
import { Button } from "@mui/material";
import * as MUIStyle from "../MUIStyles";
import { useNavigate } from "react-router-dom";


export const NewUser = () => {
const navigate = useNavigate();

  return (
    <div>
      <h1>Fàilte to Càirtean</h1>

      <br />
      <br />
      <h3>Getting started - how does this all work?</h3>
      <br/><br/>
      <p>
        Long-story short, you{" "}
        <b>
          add cards with vocabulary you want to learn to your deck, and you
          revise them
        </b>
        .
        <br />
        <br />
        When you are adding cards, you can chose to add your own custom cards,
        or add the words from a level in Duolingo. This way, you can help
        <b>reinforce the vocabulary</b> you are learning there.
        <br />
        <br />
        When you're revising, you have three options - 'wrong', 'correct', or
        'easy'.{" "}
        <b>
          Depending on your answer, Càirtean will show you that word again at
          the optimum time
        </b>{" "}
        - later the better you know it.
        <br />
        <br />
        This means you can{" "}
        <b>focus your energy in the most efficient way possible</b>
        - revising the words you need to, and not spending too much time on the
        words you already know.
        <br />
        <br />
        For millions of language learners around the world, this method - known
        as <b>'spaced-repetition' has revolutionised vocab learning</b>. If you
        study regularly, I hope it will do the same for you.
        <br />
        <br />
        Càirtean is free to use, but <b>you can support it</b> - and other
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
          <u>ko-fi.com/gordonmaloney</u>
        </a>
        .<br />
        <br /> <b>Mòran taing ❤️</b>
      </p>
<br/><br/>
      <center>
            <Button
              sx={{...MUIStyle.ButtonStyle, marginBottom: '30px'}}
              variant="contained"
              onClick={() => navigate('../')}
            >
              Get Started
            </Button>
          </center>
    </div>
  );
};
