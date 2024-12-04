import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
interface MapProps {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
  }
  const mapStyles = {
    height: '400px',
    width: '100%',
  };
  const center = {
    lat: 40.4093,
    lng: 49.8671,
  };
export const StoreMap = () => {
  return (
<LoadScript googleMapsApiKey="AIzaSyCXxLi7MwiJbTyn4297uZOAiF-y_snCIoM">
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={center}
        zoom={11}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}
