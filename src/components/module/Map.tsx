'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
    iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
    shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
});

export default function MyMap({lat = '35.6892' , lon='51.3890' , zoom = 13}: {lat : string , lon: string , zoom?:number}) {
  return (
    <MapContainer
        center={[+lat, +lon]} 
        zoom={zoom}
        style={{ height: '400px', width: '100%', zIndex: 0 }} 
        className="rounded-xl shadow-lg relative z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker  position={[+lat, +lon]}>
        <Popup></Popup>
      </Marker>
    </MapContainer>
  );
}