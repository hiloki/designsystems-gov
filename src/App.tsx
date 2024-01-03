// import React, { useRef, useState, useEffect } from "react";
import sensors from "./sensors.json";
import { GeoJsonObject } from "geojson";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const pinIcon = L.icon({
  iconUrl: "/assets/marker-icon-2x.png", // 任意のアイコン画像のURL
  iconSize: [25, 41], // アイコンのサイズ
  iconAnchor: [25, 41], // アイコンのアンカーポイント
  popupAnchor: [-12, -36], // ポップアップのアンカーポイント
});

function MyComponent() {
  const map = useMap();

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

      if (layer instanceof L.Marker) {
        layer.setIcon(pinIcon);

        layer.on("popupopen", function () {
          const markerLatLng = layer.getLatLng();

          map.setView(markerLatLng, 4);
        });
      }

      layer.bindPopup(content);
    }
  }

  return (
    <GeoJSON data={sensors as GeoJsonObject} onEachFeature={onEachFeature} />
  );
}

function App() {
  const center = new LatLng(50.845100945010074, 14.741025136756022);

  return (
    <div className="App">
      <MapContainer center={center} zoom={2.4} minZoom={2.4} maxZoom={4}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyComponent />
      </MapContainer>
    </div>
  );
}

export default App;

// https://platformland.github.io/government-design-systems/data/design-systems/
