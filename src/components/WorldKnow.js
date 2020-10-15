import React, { useEffect, useState } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

// MATERIAL-UI
import Slider from "@material-ui/core/Slider";

// CSS
import "../css/worldKnow.css";

function WorldKnow() {
  const user = useSelector(selectUser);
  const [percentageWorldKnow, setPercentageWorldKnow] = useState(0);

  useEffect(() => {
    setPercentageWorldKnow((user.countries.length * 100) / 250);
  }, [user.countries]);

  return (
    <div className="worldKnow">
      <h2>Percentage of known world</h2>
      <p>
        according to{" "}
        <a
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes"
          target="_blank"
        >
          ISO 3166-1
        </a>
      </p>

      <h1>{percentageWorldKnow} %</h1>
      <Slider value={percentageWorldKnow} />
    </div>
  );
}

export default WorldKnow;
