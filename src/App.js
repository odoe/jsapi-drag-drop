import { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import "./App.css"; 

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap
      });
    }
  }, []);

  return (
    <div className="mapContainer">
      <div className="mapDiv" ref={mapDiv}></div>
      <div className="listArea"></div>
    </div>
  );
}

export default App;
