import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

// You can provide this data later
const markers = [
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] },
  { name: "New York", coordinates: [-74.0060, 40.7128] },
  { name: "London", coordinates: [-0.1276, 51.5074] },
  { name: "Tokyo", coordinates: [139.6917, 35.6895] },
  // Add more locations as needed
];

const WorldMap = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 200,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies
          geography="/world-110m.json"
          fill="#ffffff"
          stroke="#FFFFFF"
          strokeWidth={0.5}
          style={{
            default: {
              fill: "rgba(255,255,255,0.05)",
              outline: "none",
            },
            hover: {
              fill: "rgba(255,255,255,0.1)",
              outline: "none",
            },
            pressed: {
              fill: "rgba(255,255,255,0.15)",
              outline: "none",
            },
          }}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
              />
            ))
          }
        </Geographies>

        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={4} fill="#fff" fillOpacity={0.5} />
            <circle r={8} fill="#fff" fillOpacity={0.2} />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default WorldMap; 