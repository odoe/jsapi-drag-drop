import MapDiv from "./MapDiv";

import "./App.css";

function App() {

  const onDragStarted = (e) => {
    e.dataTransfer.setData("data", e.target.dataset.severity);
  }

  return (
    <div className="mapContainer">
      <MapDiv />
      <div className="listArea" onDragStart={onDragStarted}>
        <img data-severity="1" id="symbol" src="https://arcgis.github.io/arcgis-samples-javascript/sample-data/cat1.png" height="50px" width="50px" alt="Symbol" />
        <img data-severity="2" id="symbol" src="https://arcgis.github.io/arcgis-samples-javascript/sample-data/cat2.png" height="50px" width="50px" alt="Symbol" />
        <img data-severity="3" id="symbol" src="https://arcgis.github.io/arcgis-samples-javascript/sample-data/cat3.png" height="50px" width="50px" alt="Symbol" />
      </div>
    </div>
  );
}

export default App;
