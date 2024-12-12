import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { TicketServiceInterface, TICKET_SERVICE_INTERFACE_TOKEN } from "src/app/interfaces/ticket.service.interface";
import { MapServiceInterface, MAP_SERVICE_INTERFACE_TOKEN } from "src/app/interfaces/map.service.interface";
// import { MapboxService } from "src/app/services/mapbox.service";
// import { TicketDataJsonService } from "src/app/services/ticket-data-json.service";
import { TicketViewModalComponent } from "../ticket-view-modal/ticket-view-modal.component";
import { Marker } from "mapbox-gl";
import { MarkerData } from "src/app/models/markerData";
/* import mapboxgl from 'mapbox-gl'; */

declare var bootstrap: any;

@Component({
  selector: 'app-map-common',
  templateUrl: './map-common.component.html',
  styleUrls: ['./map-common.component.css'],
})
export class MapCommonComponent implements OnInit {
  public currentCoorsd: { lng: number; lat: number } = { lng: 0, lat: 0 };
  public mapStatus!: number;
  @ViewChild(TicketViewModalComponent)
  ticketViewModal!: TicketViewModalComponent;
  public markersData!: MarkerData[];

  constructor(
    @Inject(TICKET_SERVICE_INTERFACE_TOKEN) private ticketDataService: TicketServiceInterface,
    @Inject(MAP_SERVICE_INTERFACE_TOKEN) private geoService: MapServiceInterface
  ) {}

  async ngOnInit(): Promise<void> {
    
    this.geoService.initializeMap('map');

    this.geoService.lastCoords$.subscribe((coords) => {
      if (coords.lng != 0 && coords.lat != 0) {
        this.currentCoorsd = coords;
        console.log(`DEBUG >> Coords clicked: \nlongitud: ${coords.lng} \nlatitud: ${coords.lat}`)
        this.openModal('newTicketConfModal');
      }
    });

    this.geoService.mapStatus$.subscribe((status) => {
      this.mapStatus = status;
    });

    this.geoService.lastMarkerClickedSubject$.subscribe((markerData) => {
      // console.log('DEBUG >>> Marker data: ');
      //console.log(markerData);
      this.openModal('ticketViewModal');
      this.ticketViewModal.GetTicketWithId(markerData.id.toString());
    });

    this.ticketDataService.markersData$.subscribe((markerDataRes) => {
      // console.log('DEBUG >>> Marker data RES: ');
      //console.log(markerDataRes);
      this.markersData = markerDataRes.length > 0? markerDataRes : [];
      // console.log('DEBUG >>> Marker data: ');
      //console.log(this.markersData);
      this.geoService.DrawMarkers(this.markersData);
    })

    this.ticketDataService.UpdateMarkersData();
  }

  /**
   * Available Modals:
   * - newTicketConfModal
   * @param modalID modal's HTML element ID to open
   */
  public openModal(modalID: string) {
    const modalElement = document.getElementById(modalID);

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Usa el servicio de Bootstrap para abrir el modal
      modal.show();
    }
  }

  public removeLastMark(event?: Event): void {
    this.geoService.removeLastMark();
  }
}
