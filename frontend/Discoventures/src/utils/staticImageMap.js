// Logic to render map Static Image of Mapbox

import colors from "../style/colors";
import { encode } from "@googlemaps/polyline-codec";

// Get markers for each visited places
export function renderMarkerPlaces(places) {
  let markersPlaces = "";

  places.forEach((element) => {
    console.log(element);
    markersPlaces +=
      "pin-s+" +
      colors.colorWarning400.color.slice(1) +
      "(" +
      element.latitude +
      "," +
      element.longitude +
      "),";
  });

  return markersPlaces;
}

// Get encoded URL of polyline
export function getUrlEncodedPolyline(gpsData) {
  const path = [];

  for (let i = 0; i < gpsData.latitude.length; i++) {
    path.push([gpsData.latitude[i], gpsData.longitude[i]]);
  }

  return encodeURIComponent(encode(path, 5));
}
