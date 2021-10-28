import { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

import "./MapDiv.css";

function MapDiv() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c",
        },
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
      });

      view.when(() => {
        console.log("view ready");
      });

      view.container.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      });
      view.container.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        const imageURL = event.dataTransfer.getData("image");
        const geometry = view.toMap(event);
        const graphic = {
            geometry,
            symbol: {
                type: "picture-marker",
                url: imageURL,
                height: 50,
                width: 50
            }
        };
        console.log(graphic)
        view.graphics.add(graphic);
      });
    }
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MapDiv;
