import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); // Dummy initial coordinates

  useEffect(() => {
    // TODO: Replace this geocoding with a request to the Spring Boot backend
    // Example backend call:
    // fetch(`http://localhost:8080/api/geocode?address=${encodeURIComponent(address)}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.lat && data.lng) {
    //       setPosition([data.lat, data.lng]);
    //       map.flyTo([data.lat, data.lng], 6);
    //     }
    //   })
    //   .catch(error => console.error("Geocoding error:", error));

    ELG.geocode()
      .text(address)
      .run((err, results) => {
        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 6);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>Location: {address}</Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
