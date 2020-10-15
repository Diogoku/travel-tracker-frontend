import React, { useState } from "react";

// REACT-HOOK-FORM
import { useForm } from "react-hook-form";

// COMPONENTS
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

// VALIDATION
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validation/user";

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
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// CSS
import "../css/register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerErrors, setRegisterErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onRegister = (data) => {
    axios
      .post(`/signup`, data)
      .then((res) => setSuccessMessage("Registration was Successful"))
      .catch((error) => {
        // Error
        if (error.response)
          setRegisterErrors(error.response.data.err.split(":")[2]);
        else if (error.request) console.log(error.request);
        else console.log("Error", error.message);
        console.log(error.config);
      });
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit(onRegister)}>
        <FormControl>
          <InputLabel htmlFor="register_name">Name</InputLabel>
          <Input
            id="register_name"
            name="name"
            inputRef={register}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <PermIdentityIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.name ? <ErrorMessage message={errors.name.message} /> : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="register_email">Email</InputLabel>
          <Input
            id="register_email"
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
          <InputLabel htmlFor="register_password">Password</InputLabel>
          <Input
            id="register_password"
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
          Register
        </Button>
        {successMessage ? <SuccessMessage message={successMessage} /> : null}
        {registerErrors ? <ErrorMessage message={registerErrors} /> : null}
      </form>
    </div>
  );
}

export default Register;
