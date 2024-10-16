import { MarkerData } from "../models/markerData";

export interface TicketDataService {

    GetMarkers (): Promise<MarkerData[]>;

}
