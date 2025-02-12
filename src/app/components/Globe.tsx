import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

// Define city data with coordinates and names
const cities = [
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { name: "Moscow", lat: 55.7558, lng: 37.6173 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Seoul", lat: 37.5665, lng: 126.9780 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 }
];

interface GlobeMethods {
  controls: () => any;
  pointOfView: (pov: { lat: number; lng: number; altitude: number }) => void;
}

const GlobeComponent = () => {
  const globeEl = useRef<GlobeMethods>();
  const [activePoints, setActivePoints] = useState<typeof cities>([]);

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      
      globeEl.current.pointOfView({
        lat: 20,
        lng: 0,
        altitude: 2.5
      });
    }

    // Gradually add points with a delay
    cities.forEach((city, index) => {
      setTimeout(() => {
        setActivePoints(prev => [...prev, city]);
      }, index * 200);
    });
  }, []);

  const ringGeometry = {
    ringColor: () => 'rgba(255, 255, 255, 0.5)', // Soft white
    ringMaxRadius: 2,
    ringPropagationSpeed: 3,
    ringRepeatPeriod: 2000
  };

  return (
    <div className="w-full h-full absolute inset-0">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#ffffff" // White atmosphere
        atmosphereAltitude={0.15}
        atmosphereGlow={0.1}
        width={window.innerWidth}
        height={window.innerHeight}
        hexPolygonsData={[]}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonColor={() => `rgba(255, 255, 255, ${0.1})`} // White hexagons with low opacity
        pointsData={activePoints}
        pointColor={() => 'rgba(255, 255, 255, 0.8)' } // Soft white points
        pointAltitude={0.1}
        pointRadius={0.25}
        pointsMerge={false}
        pointLabel="name"
        ringsData={activePoints}
        {...ringGeometry}
      />
    </div>
  );
};

export default GlobeComponent; 