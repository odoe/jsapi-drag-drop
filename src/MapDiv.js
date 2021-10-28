import { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import { distance, equals } from "@arcgis/core/geometry/geometryEngine";

import "./MapDiv.css";

function MapDiv() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const layer = new FeatureLayer({
        portalItem: {
          id: "c84e906801534a6eaed537b7a9ae8ef1",
        },
        outFields: ["severity"],
      });

      const webmap = new ArcGISMap({
        basemap: "dark-gray-vector",
        layers: [layer],
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-86.008, 39.96585],
        zoom: 14,
      });

      const legend = new Legend({ view });

      view.ui.add(legend, "bottom-left");

      view.when(async () => {
        console.log("view ready");
        const layerView = await view.whenLayerView(layer);

        view.container.addEventListener("dragover", (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        });
        view.container.addEventListener("drop", async (event) => {
          event.preventDefault();
          // data value to update attribute
          const severity = event.dataTransfer.getData("data");
          const geometry = view.toMap(event);

          const query = layerView.layer.createQuery();
          query.outFields = ["*"];
          query.geometry = geometry;
          query.distance = 200;
          query.units = "meters";

          // find nearby features
          const { features } = await layerView.queryFeatures(query);
          // iterate over point geometries
          // find the closest feature to where
          // drop on map occured
          const coords = features.map((x) => x.geometry);
          const distances = coords.map((coord) => distance(coord, geometry));
          const min = Math.min(...distances);
          const index = distances.findIndex((x) => x === min);
          const coord = coords[index];
          const feature = features.find((feat) => equals(feat.geometry, coord));

          feature.attributes.severity = severity;

          layer.applyEdits({
            updateFeatures: [feature],
          });
        });
      });
    }
  }, [mapDiv]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default MapDiv;
