import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, center: { lat: number, lng: number }, zoom: number): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {


      const instance = new Map(mapRef.current);

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);
      instance.setView([center.lat, center.lng], zoom);
      setMap(instance);
      isRenderedRef.current = true;
    }

    if(isRenderedRef.current) {
      map?.setView([center.lat, center.lng], zoom);
    }
  }, [mapRef, center, zoom, map]);

  return map;
}
