export type CityNameType = {
  [key: string]: {
    name: string,
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    }
  }
}
