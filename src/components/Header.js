import React from "react";

// REACT-REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../features/user/userSlice";

// MATERIAL-UI
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";

// CSS
import "../css/header.css";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <div className="header">
      <div className="header__left">
        <h2>Travel Tracker</h2>
        <RoomIcon />
      </div>
      {user ? (
        <Button variant="outlined" onClick={onLogout}>
          Logout
        </Button>
      ) : null}
    </div>
  );
}

export default Header;
