// Geodesic Area and Distance Calculations for Earth Coordinates

const EARTH_RADIUS = 6378137; // in meters

/**
 * Calculates distance between two lat/lng coordinates in meters (Haversine formula)
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
};

/**
 * Calculates total perimeter of a polygon (array of [lat, lng])
 */
export const calculatePerimeter = (coords) => {
  if (!coords || coords.length < 2) return 0;
  let totalPerimeter = 0;
  for (let i = 0; i < coords.length; i++) {
    const current = coords[i];
    const next = coords[(i + 1) % coords.length];
    totalPerimeter += calculateDistance(current[0], current[1], next[0], next[1]);
  }
  return totalPerimeter;
};

/**
 * Calculates geodesic area of a polygon on Earth sphere in square meters
 */
export const calculateAreaSqMeters = (coords) => {
  if (!coords || coords.length < 3) return 0;

  let totalArea = 0;
  const numPoints = coords.length;

  for (let i = 0; i < numPoints; i++) {
    const p1 = coords[i];
    const p2 = coords[(i + 1) % numPoints];

    const lambda1 = (p1[1] * Math.PI) / 180;
    const lambda2 = (p2[1] * Math.PI) / 180;
    const phi1 = (p1[0] * Math.PI) / 180;
    const phi2 = (p2[0] * Math.PI) / 180;

    totalArea += (lambda2 - lambda1) * (2 + Math.sin(phi1) + Math.sin(phi2));
  }

  totalArea = (totalArea * EARTH_RADIUS * EARTH_RADIUS) / 2;
  return Math.abs(totalArea);
};

/**
 * Converts area in Sq Meters to all standard agricultural units
 */
export const calculateLandMetrics = (coords) => {
  if (!coords || coords.length < 3) {
    return {
      areaSqMeters: 0,
      areaSqFeet: 0,
      areaAcres: 0,
      areaHectares: 0,
      perimeterMeters: 0,
      perimeterFeet: 0,
    };
  }

  const sqMeters = calculateAreaSqMeters(coords);
  const sqFeet = sqMeters * 10.7639104;
  const acres = sqMeters / 4046.85642;
  const hectares = sqMeters / 10000;
  const perimeterMeters = calculatePerimeter(coords);
  const perimeterFeet = perimeterMeters * 3.28084;

  return {
    areaSqMeters: Math.round(sqMeters * 100) / 100,
    areaSqFeet: Math.round(sqFeet * 100) / 100,
    areaAcres: Math.round(acres * 1000) / 1000,
    areaHectares: Math.round(hectares * 1000) / 1000,
    perimeterMeters: Math.round(perimeterMeters * 10) / 10,
    perimeterFeet: Math.round(perimeterFeet * 10) / 10,
  };
};
