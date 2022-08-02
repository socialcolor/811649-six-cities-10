import { useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Hotel, Hotels } from '../../types/hotel';
import { cities } from '../../const';
import { useEffect } from 'react';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

type MapProps = {
  offers: Hotels;
  activeOffer: Hotel | null;
  size?: {
    height?: string;
    width?: string;
  }
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ offers, activeOffer, size}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const city = cities['amsterdam'];
  const map = useMap(mapRef, city);
  //Тут мне подсказка в vscode вывела такой тип unknown и подчеркивает строку желтым
  const markers: Marker<unknown>[] = [];
  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.setIcon(activeOffer?.id === offer.id ? currentCustomIcon : defaultCustomIcon).addTo(map);
        markers.push(marker);
      });

    }

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [activeOffer?.id, map, offers, mapRef, markers]);
  return (
    <section className="map" ref={mapRef} style={size}></section>
  );
}
