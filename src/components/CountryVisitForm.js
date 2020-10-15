import React, { useState } from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken, setUser } from "../features/user/userSlice";

// COMPONENTS
import ErrorMessage from "./ErrorMessage";

// REACT-HOOK-FORM
import { useForm } from "react-hook-form";

// REACT COUNTRIES
import { CountryDropdown } from "react-country-region-selector";

// AXIOS
import axios from "../axios";

// MATERIAL-UI
import Button from "@material-ui/core/Button";

// CSS
import "../css/countryVisitForm.css";

function CountryVisitForm() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const headerConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const onVisitSubmit = () => {
    if (country !== "") {
      if (!user.countries.includes(country)) {
        axios
          .post(`/country/${user._id}`, { country: country }, headerConfig)
          .then(({ data }) => {
            dispatch(setUser(data.user));
            sessionStorage.setItem("user", JSON.stringify(data.user));
          })
          .catch((error) => {
            if (error.response) setErrorMessage(error.response.data.err);
            else if (error.request) console.log(error.request);
            else console.log("Error", error.message);
            console.log(error.config);
          });
      } else {
        axios
          .put(`/country/${user._id}`, { country: country }, headerConfig)
          .then(({ data }) => {
            dispatch(setUser(data.user));
            sessionStorage.setItem("user", JSON.stringify(data.user));
          })
          .catch((error) => {
            if (error.response) setErrorMessage(error.response.data.err);
            else if (error.request) console.log(error.request, 1);
            else console.log("Error", error.message, 2);
            console.log(error.config, 3);
          });
      }
    } else setErrorMessage("Country must be selected");
  };

  const changeCountry = (country) => {
    setCountry(country);
    setErrorMessage(null);
  };

  return (
    <form className="countryVisitForm" onSubmit={handleSubmit(onVisitSubmit)}>
      <h2>Country Visit Form</h2>
      <CountryDropdown
        value={country}
        onChange={(country) => changeCountry(country)}
      />
      <Button color="primary" variant="contained" size="small" type="Submit">
        {user.countries.includes(country) ? "Remove Visited" : "Add Visited"}
      </Button>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </form>
  );
}

export default CountryVisitForm;
