import React, { useState } from "react";

// REACT-REDUX
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../features/user/userSlice";

// COMPONENTS
import ErrorMessage from "./ErrorMessage";

// REACT-HOOK-FORM
import { useForm } from "react-hook-form";

// VALIDATION
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../validation/user";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// MATERIAL-UI ICONS
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// CSS
import "../css/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState(null);

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSignin = (data) => {
    setRegisterErrors(null);
    axios
      .post(`/signin`, data)
      .then(({ data }) => {
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
      })
      .catch((error) => {
        if (error.response) setRegisterErrors(error.response.data.err);
        else if (error.request) console.log(error.request);
        else console.log("Error", error.message);
        console.log(error.config);
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSignin)}>
        <FormControl>
          <InputLabel htmlFor="login_email">Email</InputLabel>
          <Input
            id="login_email"
            name="email"
            inputRef={register}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.email ? (
            <ErrorMessage message={errors.email.message} />
          ) : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="login_password">Password</InputLabel>
          <Input
            id="login_password"
            name="password"
            inputRef={register}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password ? (
            <ErrorMessage message={errors.password.message} />
          ) : null}
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        {registerErrors ? <ErrorMessage message={registerErrors} /> : null}
      </form>
    </div>
  );
}

export default Login;
