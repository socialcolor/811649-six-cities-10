import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import useMap from './useMap';
import { City } from '../const';


const mapRef = renderHook(() => useRef(null)).result.current;

describe('useMap', () => {
  it('should return map object', () => {
    const { result } = renderHook(() => useMap(mapRef, { lat: City.Paris.location.latitude, lng: City.Paris.location.longitude }, City.Paris.location.zoom));

    expect(result).toBeInstanceOf(Object);
  });
});
