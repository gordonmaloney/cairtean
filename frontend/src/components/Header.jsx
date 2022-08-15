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
import { KeyboardEvent } from "react";
import { Box } from "@mui/system";
import { Menu } from "../pages/Menu";

function Header() {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
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

  return (
    <header className="header">

      <div onClick={toggleDrawer(true)}>
        Cairtean
      </div>

      {user ? (
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
  );
}

export default Header;
