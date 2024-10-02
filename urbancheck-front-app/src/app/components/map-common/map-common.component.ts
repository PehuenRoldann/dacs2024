import { Component, OnInit, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
/* import mapboxgl from 'mapbox-gl'; */

declare var bootstrap: any;

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.css']
})


export class MapCommonComponent implements OnInit {

  // @ViewChild(ReclamoModalComponent) modal! : ReclamoModalComponent;
  public currentCoorsd!: {lng: number, lat: number};

  constructor(private geoService: GeolocationService) {}

  ngOnInit(): void {
    
    this.geoService.initializeMap("map");

    document.getElementById("map")?.addEventListener('click', (event) => {
      this.currentCoorsd = this.geoService.getCoordinatesFromClick(event); // Obtén las coordenadas del clic
      this.openModal("myModal");
    });
  }


  public openModal(modalID: string) {
    const modalElement = document.getElementById(modalID);

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Usa el servicio de Bootstrap para abrir el modal
      modal.show();
    }
  }

  public removeLastMark(): void {
    this.geoService.removeLastMark();
  }

}
