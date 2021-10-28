import { useRef, useEffect, useCallback, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import Dropzone from "react-dropzone";

import "./MapDiv.css";

function MapDiv() {
  const mapDiv = useRef(null);
  const [view, setView] = useState(null);

  const onDrop = useCallback(
    (event) => {
      event.stopPropagation();
      if (!view) return;

      const imageURL = event.dataTransfer.getData("image");
      const geometry = view.toMap(event.nativeEvent);
      const graphic = {
        geometry,
        symbol: {
          type: "picture-marker",
          url: imageURL,
          height: 50,
          width: 50,
        },
      };
      view.graphics.add(graphic);
    },
    [view]
  );

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c",
        },
      });

      const mapView = new MapView({
        container: mapDiv.current,
        map: webmap,
      });

      setView(mapView);
    }
  }, [mapDiv]);
  return (
    <Dropzone onDrop={(files) => console.log(files)}>
      {({ getRootProps }) => (
        <div
          {...getRootProps({
            className: "dropContainer",
            onDrop,
          })}
        >
          <div className="mapDiv" ref={mapDiv}></div>
        </div>
      )}
    </Dropzone>
  );
}

export default MapDiv;
