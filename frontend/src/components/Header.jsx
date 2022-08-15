import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Button } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Cairtean</Link>
      </div>
      <ul>
      <li>
          <NavLink to="/study">Study</NavLink>
        </li>

        <li>
          <NavLink to="/add">Add Cards</NavLink>
        </li>
        <li>
          <NavLink to="/bulk">Bulk Add</NavLink>
        </li>

        {user ? (
          <li>
            <Button variant="contained" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          </li>
        ) : (
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
        )}
      </ul>
    </header>
  );
}

export default Header;
