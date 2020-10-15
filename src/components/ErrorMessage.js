import React from "react";

// MATERIAL-UI
import WarningIcon from "@material-ui/icons/Warning";

// CSS
import "../css/messages.css";

function ErrorMessage({ message }) {
  return (
    <div>
      {message ? (
        <p className="message errorMessage">
          <WarningIcon /> {message}
        </p>
      ) : null}
    </div>
  );
}

export default ErrorMessage;
