import { useEffect, useRef } from 'react';

interface EventMapProps {
  location: string;
  latitude?: number;
  longitude?: number;
  title?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function EventMap({ location, latitude = -23.5505, longitude = -46.6333, title }: EventMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY;

  useEffect(() => {
    if (!mapContainer.current) return;

    const initMap = () => {
      if (!mapContainer.current || !window.google) return;

      map.current = new window.google.maps.Map(mapContainer.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: false,
      });

      // Add marker
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map.current,
        title: title || location,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px; font-size: 14px; font-weight: 600; color: #111;">
          ${title || location}
        </div>`,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map.current,
        title: title || location,
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current, marker);
      });

      // Fit bounds to marker
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: latitude, lng: longitude });
      map.current.fitBounds(bounds);
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (mapContainer.current) {
          initMap();
        }
      };
      document.head.appendChild(script);
    } else {
      // Google Maps already loaded
      initMap();
    }
  }, [latitude, longitude, location, title, mapsApiKey]);

  if (!mapsApiKey) {
    return (
      <div className="w-full h-96 bg-slate-100 rounded-3xl flex items-center justify-center text-center p-6">
        <p className="text-sm text-slate-500">Google Maps API não configurada</p>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-96 rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden" />;
}
