import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private map!: mapboxgl.Map;

  private lastMark!: mapboxgl.Marker;

  constructor() { }

  private async getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true, // Solicita alta precisión
          timeout: 10000, // Tiempo máximo de espera (10 segundos)
          maximumAge: 0 // Fuerza la obtención de coordenadas actualizadas
        });
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
  

  public async initializeMap(mapElementId: string): Promise<void> {

    var coords = await this.getCurrentLocation();
    var lat = coords.coords.latitude;
    var long = coords.coords.longitude;
    mapboxgl.accessToken= 'pk.eyJ1IjoicGVodWVucm9sZGFuIiwiYSI6ImNtMXJ6cXF2cTAxMW4yc3ByaThhMGE2NnMifQ.vw08b7kOokW5B1dvW04RoQ';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    console.log(`Coords Accuracy: ${coords.coords.accuracy}`);

    this.map = map;

      map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })
    );

  }

  public getCoordinatesFromClick(event: MouseEvent): { lng: number; lat: number } {
    const map = this.map; // Suponiendo que guardas el mapa en una propiedad
    const bounds = map.getBounds();
    
    // Calcular las coordenadas del clic
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const lngLat = map.unproject([
      event.clientX - rect.left,
      event.clientY - rect.top
    ]);
    
    this.lastMark = new mapboxgl.Marker()
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(map);
    
    return {
      lng: lngLat.lng,
      lat: lngLat.lat
    };
  }

  public removeLastMark(): void {

    this.lastMark.remove();

  }
  
}
