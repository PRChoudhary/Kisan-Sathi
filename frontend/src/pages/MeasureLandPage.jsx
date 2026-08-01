import React, { useState, useEffect, useRef } from 'react';
import MapContainerComponent from '../components/LandMeasure/MapContainer';
import PointTapControls from '../components/LandMeasure/PointTapControls';
import ManualDrawControls from '../components/LandMeasure/ManualDrawControls';
import GPSWalkControls from '../components/LandMeasure/GPSWalkControls';
import LandMetricsCard from '../components/LandMeasure/LandMetricsCard';
import SavedFieldsModal from '../components/LandMeasure/SavedFieldsModal';
import { calculateLandMetrics } from '../utils/geoCalcs';
import { saveNewField, updateFieldApi, deleteFieldApi } from '../services/api';
import { useApp } from '../context/AppContext';
import { LuMousePointerClick, LuPencil, LuFootprints, LuFolder, LuNavigation } from 'react-icons/lu';

export default function MeasureLandPage() {
  const [activeMethod, setActiveMethod] = useState('TAP_POINTS'); // TAP_POINTS, MANUAL_DRAW, GPS_WALK
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  
  // GPS Walk Track States
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const watchIdRef = useRef(null);

  // Saved Fields Modal
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { savedFields, setSavedFields, loadSavedFields, showToast } = useApp();

  // Get current GPS position on load
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(loc);
          setMapCenter(loc);
        },
        (err) => {
          console.warn('Geolocation prompt rejected or unavailable:', err.message);
        }
      );
    }
  }, []);

  // Point Addition Handler (Method 1 & Method 2)
  const handleAddPoint = (latlng) => {
    if (activeMethod === 'GPS_WALK' && isTracking && !isPaused) return;
    setPolygonCoords((prev) => [...prev, latlng]);
  };

  // Vertex Drag Handler (Method 2 Editing)
  const handleUpdateVertex = (index, newLatlng) => {
    setPolygonCoords((prev) => {
      const updated = [...prev];
      updated[index] = newLatlng;
      return updated;
    });
  };

  const handleUndo = () => {
    setPolygonCoords((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPolygonCoords([]);
    setIsEditing(false);
    if (isTracking) {
      handleStopGPS();
    }
  };

  // METHOD 3: GPS WALK TRACKING LOGIC
  const handleStartGPS = () => {
    if (!('geolocation' in navigator)) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }
    setPolygonCoords([]);
    setIsTracking(true);
    setIsPaused(false);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const point = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(point);
        setMapCenter(point);
        setPolygonCoords((prev) => {
          // Avoid duplicate points too close
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            if (Math.abs(last[0] - point[0]) < 0.00002 && Math.abs(last[1] - point[1]) < 0.00002) {
              return prev;
            }
          }
          return [...prev, point];
        });
      },
      (err) => {
        showToast('GPS Error: ' + err.message, 'error');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
    showToast('GPS Walk Tracking Started! Walk along your field perimeter.', 'success');
  };

  const handlePauseGPS = () => {
    setIsPaused(true);
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    showToast('GPS Tracking Paused', 'info');
  };

  const handleResumeGPS = () => {
    setIsPaused(false);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const point = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(point);
        setPolygonCoords((prev) => [...prev, point]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
    showToast('GPS Tracking Resumed', 'success');
  };

  const handleStopGPS = () => {
    setIsTracking(false);
    setIsPaused(false);
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    showToast('GPS Walk Tracking Stopped', 'info');
  };

  // Demo Simulation for Stationary desktop testing
  const handleSimulateGPSWalk = () => {
    handleClear();
    setIsTracking(true);
    const startLat = userLocation ? userLocation[0] : 28.6139;
    const startLng = userLocation ? userLocation[1] : 77.2090;

    const samplePolygon = [
      [startLat, startLng],
      [startLat + 0.0012, startLng + 0.0002],
      [startLat + 0.0014, startLng + 0.0015],
      [startLat + 0.0001, startLng + 0.0016],
      [startLat, startLng]
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < samplePolygon.length) {
        const p = samplePolygon[step];
        setPolygonCoords((prev) => [...prev, p]);
        setMapCenter(p);
        step++;
      } else {
        clearInterval(interval);
        setIsTracking(false);
        showToast('Walk Simulation complete! Field polygon generated.', 'success');
      }
    }, 800);
  };

  // Live Metrics Calculation
  const metrics = calculateLandMetrics(polygonCoords);

  // SAVE FIELD HANDLER
  const handleSaveField = async () => {
    if (polygonCoords.length < 3) {
      showToast('Need at least 3 points to save a field', 'error');
      return;
    }

    const fieldName = prompt('Enter a name for this field:', `Field ${savedFields.length + 1}`);
    if (!fieldName) return;

    try {
      const payload = {
        name: fieldName,
        polygon: polygonCoords,
        method: activeMethod,
        ...metrics
      };

      const res = await saveNewField(payload);
      if (res.data?.success) {
        showToast(`Field "${fieldName}" saved successfully!`, 'success');
        loadSavedFields();
      }
    } catch (err) {
      showToast('Failed to save field', 'error');
    }
  };

  // LOAD FIELD ONTO MAP HANDLER
  const handleLoadFieldOntoMap = (field) => {
    if (field && field.polygon) {
      setPolygonCoords(field.polygon);
      if (field.polygon.length > 0) {
        setMapCenter(field.polygon[0]);
      }
      showToast(`Loaded "${field.name}" onto map for editing`, 'info');
    }
  };

  // RENAME FIELD
  const handleRenameField = async (id, newName) => {
    try {
      await updateFieldApi(id, { name: newName });
      loadSavedFields();
      showToast('Field renamed', 'success');
    } catch (err) {
      showToast('Failed to rename field', 'error');
    }
  };

  // DELETE FIELD
  const handleDeleteField = async (id) => {
    if (window.confirm('Are you sure you want to delete this saved field?')) {
      try {
        await deleteFieldApi(id);
        loadSavedFields();
        showToast('Field deleted', 'info');
      } catch (err) {
        showToast('Failed to delete field', 'error');
      }
    }
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-farmer-600 bg-farmer-50 px-3 py-1 rounded-full border border-farmer-200">
            Module 3 • Flagship Feature
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
            Satellite Land Field Measurement
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Calculate exact land area in Acres, Hectares, Sq Meters, Sq Feet & Perimeter using 3 measurement methods.
          </p>
        </div>

        {/* View Saved Fields Button */}
        <button
          onClick={() => setIsSavedModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-farmer-800 hover:bg-farmer-900 text-white font-black text-sm shadow-lg shadow-farmer-800/30 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <LuFolder className="w-5 h-5 text-amber-400" />
          <span>Saved Fields ({savedFields.length})</span>
        </button>
      </div>

      {/* METHOD SELECTION TABS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Method 1 Tab */}
        <button
          onClick={() => {
            setActiveMethod('TAP_POINTS');
            setIsEditing(false);
          }}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeMethod === 'TAP_POINTS'
              ? 'bg-farmer-600 text-white border-farmer-700 shadow-lg shadow-farmer-600/25 ring-2 ring-farmer-400'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'TAP_POINTS' ? 'bg-white/20' : 'bg-farmer-50 text-farmer-700'}`}>
            <LuMousePointerClick className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm">Method 1</h4>
            <p className={`text-xs ${activeMethod === 'TAP_POINTS' ? 'text-farmer-100' : 'text-slate-500'}`}>
              Tap Multiple Points
            </p>
          </div>
        </button>

        {/* Method 2 Tab */}
        <button
          onClick={() => {
            setActiveMethod('MANUAL_DRAW');
            setIsEditing(true);
          }}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeMethod === 'MANUAL_DRAW'
              ? 'bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-500/25 ring-2 ring-amber-300'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'MANUAL_DRAW' ? 'bg-white/20' : 'bg-amber-50 text-amber-800'}`}>
            <LuPencil className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm">Method 2</h4>
            <p className={`text-xs ${activeMethod === 'MANUAL_DRAW' ? 'text-amber-100' : 'text-slate-500'}`}>
              Draw & Drag Nodes
            </p>
          </div>
        </button>

        {/* Method 3 Tab */}
        <button
          onClick={() => {
            setActiveMethod('GPS_WALK');
            setIsEditing(false);
          }}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeMethod === 'GPS_WALK'
              ? 'bg-sky-600 text-white border-sky-700 shadow-lg shadow-sky-600/25 ring-2 ring-sky-300'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className={`p-3 rounded-xl ${activeMethod === 'GPS_WALK' ? 'bg-white/20' : 'bg-sky-50 text-sky-700'}`}>
            <LuFootprints className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm">Method 3</h4>
            <p className={`text-xs ${activeMethod === 'GPS_WALK' ? 'text-sky-100' : 'text-slate-500'}`}>
              Walk Field with GPS
            </p>
          </div>
        </button>

      </div>

      {/* Active Method Control Bar */}
      <div>
        {activeMethod === 'TAP_POINTS' && (
          <PointTapControls
            pointsCount={polygonCoords.length}
            onUndo={handleUndo}
            onClear={handleClear}
            onFinish={() => setIsEditing(true)}
          />
        )}

        {activeMethod === 'MANUAL_DRAW' && (
          <ManualDrawControls
            pointsCount={polygonCoords.length}
            isEditing={isEditing}
            onToggleEdit={() => setIsEditing(!isEditing)}
            onClear={handleClear}
          />
        )}

        {activeMethod === 'GPS_WALK' && (
          <GPSWalkControls
            isTracking={isTracking}
            isPaused={isPaused}
            pointCount={polygonCoords.length}
            onStart={handleStartGPS}
            onPause={handlePauseGPS}
            onResume={handleResumeGPS}
            onStop={handleStopGPS}
            onSimulateWalk={handleSimulateGPSWalk}
          />
        )}
      </div>

      {/* Main Map + Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaflet Satellite Map (2 cols) */}
        <div className="lg:col-span-2">
          <MapContainerComponent
            polygonCoords={polygonCoords}
            onAddPoint={handleAddPoint}
            onUpdateVertex={handleUpdateVertex}
            activeMethod={activeMethod}
            userLocation={userLocation}
            mapCenter={mapCenter}
            isEditing={isEditing}
          />
        </div>

        {/* Calculated Metrics Card (1 col) */}
        <div>
          <LandMetricsCard
            metrics={metrics}
            onSaveField={handleSaveField}
            pointsCount={polygonCoords.length}
          />
        </div>

      </div>

      {/* Saved Fields Drawer / Modal */}
      <SavedFieldsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedFields={savedFields}
        onLoadField={handleLoadFieldOntoMap}
        onRenameField={handleRenameField}
        onDeleteField={handleDeleteField}
      />

    </div>
  );
}
