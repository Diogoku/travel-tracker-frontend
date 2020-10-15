import React from "react";

// MATERIAL-UI
import CheckIcon from "@material-ui/icons/Check";

// CSS
import "../css/messages.css";

function SuccessMessage({ message }) {
  return (
    <div>
      {message ? (
        <p className="message successMessage">
          <CheckIcon /> {message}
        </p>
      ) : null}
    </div>
  );
}

export default SuccessMessage;
