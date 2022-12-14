import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { Button, FormLabel, TextField, Grid } from "@mui/material";
import * as MUIStyle from "../MUIStyles";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <>
      <section>
        <h1>
          Log in
        </h1>
      </section>
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
          sx={MUIStyle.TextFieldStyle}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
                    sx={MUIStyle.TextFieldStyle}

            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <center>
          <Button sx={MUIStyle.ButtonStyle} variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          </center>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
