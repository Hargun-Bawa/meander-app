'use client';

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 49.2827, lng: -123.1207 });
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationLoaded(true);
      });
    } else {
      console.log('Failed to get the location');
    }
  }, []);

  return (
    <MapContainer center={[geoData.lat, geoData.lng]} zoom={12} style={{ height: '60vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locationLoaded && (
        <RecenterMap geoData={geoData} />
      )}
      {geoData.lat && geoData.lng && (
        <Marker position={[geoData.lat, geoData.lng]} />
      )}
    </MapContainer>
  );
}

function RecenterMap({ geoData }: { geoData: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([geoData.lat, geoData.lng]);
  }, [geoData, map]);
  return null;
}
