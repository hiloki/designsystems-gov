// import React from "react";
import sensors from "./sensors.json";
import { GeoJsonObject } from "geojson";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const center = new LatLng(50.845100945010074, 14.741025136756022);

  function onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties) {
      const { name, organization, url, thumbnailId } = feature.properties;
      const thumbnail = thumbnailId
        ? `<a href=${
            `https://` + url
          } target="_blank"><img src="/assets/${thumbnailId}.png" alt="${name} thumbnail image" class="dsg-popup-content-thumbnail" /></a>`
        : "";
      const content = `${thumbnail}<div class="dsg-popup-content-body"><h2 class="dsg-popup-content-name"><a href=${
        `https://` + url
      } target="_blank">${organization}</a></h2><p class="dsg-popup-content-organization">${name}</p><p class="dsg-popup-content-url">${url}</p></div>`;

      layer.bindPopup(content);
    }
  }

  return (
    <div className="App">
      <MapContainer center={center} zoom={2.4} minZoom={2.4} maxZoom={4}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={sensors as GeoJsonObject}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}

export default App;

// https://platformland.github.io/government-design-systems/data/design-systems/
