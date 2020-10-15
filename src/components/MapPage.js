import React from "react";

// COMPONENTS
import WorldMap from "./WorldMap";
import CountryVisitForm from "./CountryVisitForm";
import WorldKnow from "./WorldKnow";

// CSS
import "../css/mapPage.css";

function MapPage() {
  return (
    <div className="mapPage">
      <WorldMap />
      <div className="mapPage__rightSide">
        <CountryVisitForm />
        <WorldKnow />
      </div>
    </div>
  );
}

export default MapPage;
