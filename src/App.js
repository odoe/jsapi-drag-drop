import MapDiv from "./MapDiv";

import "./App.css";

function App() {

  const onDragStarted = (e) => {
    e.dataTransfer.setData("image", e.target.src);
  }

  return (
    <div className="mapContainer">
      <MapDiv />
      <div className="listArea" onDragStart={onDragStarted}>
        <img id="symbol" src="https://arcgis.github.io/arcgis-samples-javascript/sample-data/layers-ogcfeaturelayer/windmill.png" height="50px" width="50px" alt="Symbol" />
      </div>
    </div>
  );
}

export default App;
