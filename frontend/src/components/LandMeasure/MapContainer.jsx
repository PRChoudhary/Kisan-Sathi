import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Polygon, Polyline, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LuLayers, LuNavigation } from 'react-icons/lu';

// Custom marker icon for polygon vertices
const createVertexIcon = (index, isEditing) => {
  return L.divIcon({
    className: 'custom-vertex-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      background: ${isEditing ? '#ef4444' : '#16a34a'};
      color: white;
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      cursor: pointer;
    ">${index + 1}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

// Custom icon for current GPS user position
const gpsUserIcon = L.divIcon({
  className: 'gps-user-marker',
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.4);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// MapClickController component to listen for taps on the satellite map
function MapClickHandler({ activeMethod, onAddPoint }) {
  useMapEvents({
    click(e) {
      if (activeMethod === 'TAP_POINTS' || activeMethod === 'MANUAL_DRAW') {
        const { lat, lng } = e.latlng;
        onAddPoint([lat, lng]);
      }
    }
  });
  return null;
}

// Center view controller
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 18);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapContainerComponent({
  polygonCoords,
  onAddPoint,
  onUpdateVertex,
  activeMethod,
  userLocation,
  mapCenter,
  isEditing
}) {
  const [mapType, setMapType] = useState('SATELLITE'); // SATELLITE or STREETS

  // Tile layers
  const satelliteUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const streetsUrl = "https://{s}.tile.openstreetmap.org/{z}/{y}/{x}.png";

  const defaultCenter = mapCenter || userLocation || [28.6139, 77.2090]; // Default New Delhi

  return (
    <div className="relative w-full h-[550px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      
      {/* Map Control Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setMapType(mapType === 'SATELLITE' ? 'STREETS' : 'SATELLITE')}
          className="px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-800 font-extrabold text-xs shadow-lg border border-slate-200 flex items-center gap-2 hover:bg-white transition-all"
        >
          <LuLayers className="w-4 h-4 text-farmer-600" />
          <span>{mapType === 'SATELLITE' ? '📡 Satellite View' : '🗺️ Street View'}</span>
        </button>
      </div>

      <LeafletMap
        center={defaultCenter}
        zoom={18}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeMapView center={defaultCenter} zoom={18} />

        {/* Base Tiles */}
        <TileLayer
          attribution="&copy; Esri & OpenStreetMap contributors"
          url={mapType === 'SATELLITE' ? satelliteUrl : streetsUrl}
          maxZoom={20}
        />

        {/* Click listener */}
        <MapClickHandler activeMethod={activeMethod} onAddPoint={onAddPoint} />

        {/* Current GPS Position Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={gpsUserIcon} />
        )}

        {/* Polyline for points under 3 */}
        {polygonCoords.length >= 2 && polygonCoords.length < 3 && (
          <Polyline
            positions={polygonCoords}
            pathOptions={{ color: '#22c55e', weight: 4, dashArray: '6, 6' }}
          />
        )}

        {/* Polygon for 3+ points */}
        {polygonCoords.length >= 3 && (
          <Polygon
            positions={polygonCoords}
            pathOptions={{
              color: isEditing ? '#ef4444' : '#16a34a',
              fillColor: isEditing ? '#f87171' : '#4ade80',
              fillOpacity: 0.45,
              weight: 3,
            }}
          />
        )}

        {/* Vertex Markers */}
        {polygonCoords.map((point, index) => (
          <Marker
            key={`vertex-${index}-${point[0]}-${point[1]}`}
            position={point}
            icon={createVertexIcon(index, isEditing)}
            draggable={isEditing || activeMethod === 'MANUAL_DRAW'}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const position = marker.getLatLng();
                if (onUpdateVertex) {
                  onUpdateVertex(index, [position.lat, position.lng]);
                }
              }
            }}
          />
        ))}

      </LeafletMap>
    </div>
  );
}
