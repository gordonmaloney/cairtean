import { useState } from "react";

import * as MUIStyle from "../MUIStyles";
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material";

function AboutModal({ cards, noRemaining }) {
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        sx={{...MUIStyle.ButtonStyle, marginBottom: '5px'}}
        variant="contained"
        onClick={() => setOpen(true)}
        size="small"
      >
        how does this all work??
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MUIStyle.ModalStyleWide}>
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
            help
            <b>reinforce the vocabulary</b> you are learning there.
            <br />
            <br />
            When you're revising, you have three options - 'wrong', 'correct',
            or 'easy'.{" "}
            <b>
              Depending on your answer, Càirtean will show you that word again
              at the optimum time
            </b>{" "}
            - later the better you know it.
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
              <u>ko-fi.com/gordonmaloney</u>.<br />
              <br /> <b>Mòran taing ❤️</b>
            </a>
          </p>
          <br />
          <br />
          <center>
            <Button
              sx={MUIStyle.ButtonStyleCancel}
              variant="contained"
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </center>
        </Box>
      </Modal>
    </>
  );
}

export default AboutModal;
