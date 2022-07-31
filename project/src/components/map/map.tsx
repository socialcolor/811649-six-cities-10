import { useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { Hotels } from '../../types/hotel';
import { cities } from '../../const';
import { useEffect } from 'react';
import {URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  offers: Hotels;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ offers }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const city = cities['amsterdam'];
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(defaultCustomIcon).addTo(map);
      });

    }
  });

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}
