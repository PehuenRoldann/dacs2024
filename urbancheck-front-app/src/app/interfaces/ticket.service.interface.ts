import { Observable } from "rxjs";
import { MarkerData } from "../models/markerData";
import { Ticket } from "../models/ticket";
import { InjectionToken } from "@angular/core";

export interface TicketServiceInterface {
  GetMarkers(): Promise<MarkerData[]>;
  GetTicketData(ticketId: string): Observable<Ticket>;
}

// Crea el token de inyección
export const TICKET_SERVICE_INTERFACE_TOKEN = new InjectionToken<TicketServiceInterface>('ITicketDataService');
