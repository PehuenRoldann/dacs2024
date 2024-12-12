import { Observable } from "rxjs";
import { MarkerData } from "../models/markerData";
import { Ticket } from "../models/ticket";
import { InjectionToken } from "@angular/core";
import MunicipalDependencies from "../models/municipalDependencie";

export interface TicketServiceInterface {
  //GetMarkers(): Promise<MarkerData[]>;
  markersData$: Observable<MarkerData[]>;
  ticketData$: Observable<Ticket>;


  //GetTicketData(ticketId: string): Observable<Ticket>;

  AddTicket(description: string, dependency: number, longitud: number, latitud: number): Observable<Ticket>;
  /**Actualiza el observable con los marcadores.*/
  UpdateMarkersData(): void;
  /** Actualiza el valor del ticekt seleccionado */
  UpdateTicketData(id: string): void

}

// Crea el token de inyección
export const TICKET_SERVICE_INTERFACE_TOKEN = new InjectionToken<TicketServiceInterface>('ITicketDataService');
