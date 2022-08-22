import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { Button, TextField, Grid } from "@mui/material";
import * as MUIStyle from "../MUIStyles";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
      navigate("/newuser");
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <>
      <section className="heading">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <br />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            sx={MUIStyle.TextFieldStyle}
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </Grid>
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
            placeholder="Enter password"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={MUIStyle.TextFieldStyle}
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <center>
          <Button
            sx={MUIStyle.ButtonStyle}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button></center>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
