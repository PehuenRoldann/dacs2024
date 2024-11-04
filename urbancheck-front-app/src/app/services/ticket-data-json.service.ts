import { Injectable } from '@angular/core';
import { TicketServiceInterface } from '../interfaces/ticket.service.interface';
// import mapboxgl, { Marker } from 'mapbox-gl'; NO SE USA DE MOMENTO
import { delay, map, Observable, timer } from 'rxjs';
import { MarkerData } from '../models/markerData';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import '../../assets/test_data/tickets.json';



@Injectable({
  providedIn: 'root',
})
export class TicketDataJsonService implements TicketServiceInterface {
  private jsonUrl = 'assets/test_data/tickets.json';
  constructor(private http: HttpClient) {}

   GetTicketData(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket[]>(this.jsonUrl).pipe(
      delay(2000), // Simula el delay para imitar una llamada a API
      map((data) => data.find((item) => item.id === ticketId)), // Encuentra el elemento que coincide con el ID
      map((item) => (new Ticket(item))) // Convierte el resultado a instancia de Item o undefined
    );
  }

  // Función para simular una llamada a una API con un retraso
  GetMarkers(): Promise<MarkerData[]> {
    return new Promise((resolve) => {
      // Simulamos un retraso de 2 segundos
      setTimeout(() => {
        resolve(this.DATA);
      }, 2000); // 2000 ms = 2 segundos
    });
  }

  private readonly DATA = [
    {
      id: 1,
      lng: -58.23029921189274,
      lat: -32.485129825270334,
    },
    {
      id: 2,
      lng: -58.22872620255508,
      lat: -32.4840917606197,
    },
    {
      id: 3,
      lng: -58.22860714778599,
      lat: -32.48410636016587,
    },
    {
      id: 4,
      lng: -58.23031949712937,
      lat: -32.493964062197826,
    },
    {
      id: 5,
      lng: -58.22906735700833,
      lat: -32.49627731002452,
    },
    {
      id: 6,
      lng: -58.230820612911835,
      lat: -32.493058507899555,
    },
    {
      id: 7,
      lng: -58.230825518214935,
      lat: -32.48691013063389,
    },
    {
      id: 8,
      lng: -58.228035362856616,
      lat: -32.48750363200155,
    },
    {
      id: 9,
      lng: -58.229257588618744,
      lat: -32.491913474578546,
    },
    {
      id: 10,
      lng: -58.2278057188553,
      lat: -32.48838064524328,
    }
  ];
}


