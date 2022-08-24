import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as authReset } from "../features/auth/authSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCards,
  reset as cardsReset,
  isError,
  isLoading,
} from "../features/cards/cardSlice";
import { updateStreak } from "../features/auth/authSlice";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";
import { Menu } from "../pages/Menu";
import * as MUIStyle from "../MUIStyles";

import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

function Header() {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (KeyboardEvent.key === "Tab" || KeyboardEvent.key === "Shift")
    ) {
      return;
    }
    setDrawer((prev) => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="header">
        {user ? (
          <>
            <Button
              sx={MUIStyle.ButtonStyle}
              variant="contained"
              onClick={toggleDrawer("left", true)}
            >
              open menu
            </Button>

            <h1 onClick={() => navigate("../")}>Cairtean</h1>

            <SwipeableDrawer
              anchor="left"
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
                <>
                  <br />
                  <br />
                  <Menu />
                </>
              </Box>
            </SwipeableDrawer>
          </>
        ) : (
          <>
            <Button onClick={toggleDrawer("left", true)}>open menu</Button>

            <SwipeableDrawer
              anchor="left"
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
                <>
                  <br />
                  <br />

                  <>
                    <li>
                      <Link to="/login">
                        <FaSignInAlt /> Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <FaUser /> Register
                      </Link>
                    </li>
                  </>
                </>
              </Box>
            </SwipeableDrawer>
          </>
        )}
      </header>
      <div style={{ float: "right", marginTop: "-50px" }}>
        <Button
          size="small"
          variant="contained"
          sx={MUIStyle.ButtonStyle}
          onClick={() => setOpen(true)}
        >
          Support Cairtean
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...MUIStyle.ModalStyleWide,
            backgroundColor: MUIStyle.offwhite,
          }}
        >
          <h3>Support Cairtean</h3>
          <br />
          <br />
          <p>
            Cairtean is free for you to use, but it took{" "}
            <b>a huge amount of time and energy</b> to build, requires{" "}
            <b>ongoing maintenance</b>, and <b>costs money</b> to host.
            <br />
            <br />
            Alongside Cairtean, I have also built{" "}
            <a target="_blank" href="facle.netlify.app">
              <u>Facle</u>
            </a>{" "}
            and{" "}
            <a target="_blank" href="https://cuimhne.netlify.app/">
              <u>Cuimhne</u>
            </a>
            , and have big ambitions and plans for{" "}
            <b>more Gaelic-learning software</b>.
            <br />
            <br />I know money is tight for everyone right now. But if you can
            spare just a few pounds, it will make it possible for me to carry on
            working on{" "}
            <b>this app and other tools to help people learn Gaelic</b>.
            <br />
            <br />
            <center>
              <b>
                If you've found this or any of my other apps useful, please chip
                in to support them here:
              </b>
            </center>
            <br />
            <br />
            <center>
              <Button
                size="large"
                variant="contained"
                sx={MUIStyle.ButtonStyle}
                target="_blank"
                href="http://ko-fi.com/gordonmaloney"
              >
                Chip In
              </Button>
            </center>
            <br />
          </p>
        </Box>
      </Modal>
    </>
  );
}

export default Header;
