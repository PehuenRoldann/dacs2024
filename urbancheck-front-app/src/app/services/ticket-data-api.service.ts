import { Injectable } from '@angular/core';
import { TicketServiceInterface } from '../interfaces/ticket.service.interface';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { MarkerData } from '../models/markerData';
import { Ticket } from '../models/ticket';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service'; // Importar el servicio AuthService

@Injectable({
  providedIn: 'root',
})
export class TicketDataApiService implements TicketServiceInterface {
  private markersDataSubject: BehaviorSubject<MarkerData[]> = new BehaviorSubject<MarkerData[]>([]);
  public markersData$: Observable<MarkerData[]> = this.markersDataSubject.asObservable();

  private ticketDataSubject: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>(new Ticket());
  public ticketData$: Observable<Ticket> = this.ticketDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService // Inyectar el servicio AuthService
  ) {}

  // Método para agregar un ticket
  AddTicket(description: string, dependencyId: number, longitud: number, latitud: number): Observable<Ticket> {
    return new Observable((observer) => {
      // Obtén el token de AuthService
      this.auth.getToken().then((token: string | null) => {
        if (!token) {
          observer.error(new Error('No se pudo obtener el token.'));
          return;
        }

        // Configura los encabezados con el token
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }),
        };

        // Define la URL de la API
        const url = `${environment.backendForFrontendUrl}/ticket`;

        // Realiza la solicitud POST para crear el ticket
        this.http
          .post<any>(
            url,
            {
              descripcion: description,
              latitud: latitud,
              longitud: longitud,
              dependenciaId: dependencyId,
            },
            httpOptions
          )
          .pipe(
            map((response) => {
              return Ticket.fromJson(response); // Procesa la respuesta
            }),
            catchError((error) => {
              console.error('Error al agregar el ticket:', error);
              return throwError(() => new Error('No se pudo agregar el ticket.'));
            })
          )
          .subscribe({
            next: (ticket) => observer.next(ticket),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
      }).catch((error) => {
        console.error('Error al obtener el token:', error);
        observer.error(new Error('No se pudo obtener el token.'));
      });
    });
  }

  // Método para actualizar los datos de los marcadores
  public UpdateMarkersData(): void {
    // Obtén el token de AuthService
    this.auth.getToken().then((token: string | null) => {
      if (!token) {
        console.error('No se pudo obtener el token.');
        return;
      }

      // Configura los encabezados con el token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Define la URL de la API
      const url = `${environment.backendForFrontendUrl}/ticket`;

      // Realiza la solicitud GET para obtener los datos de los marcadores
      this.http.get<MarkerData[]>(url, { headers }).subscribe({
        next: (response) => {
          const markers = response.map((marker) => ({
            id: marker.id,
            longitud: marker.longitud,
            latitud: marker.latitud,
          }));
          // Emite los nuevos datos a los suscriptores
          this.markersDataSubject.next(markers);
        },
        error: (error) => {
          console.error('Error al actualizar los datos de los marcadores:', error);
        },
      });
    }).catch((error) => {
      console.error('Error al obtener el token:', error);
    });
  }

  // Método para actualizar los datos de un ticket
  public UpdateTicketData(id: string): void {
    this.auth.getToken().then((token: string | null) => {
      if (!token) {
        console.error('No se pudo obtener el token.');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const url = `${environment.backendForFrontendUrl}/ticket/${id}`;

      this.http.get<Ticket>(url, { headers }).subscribe({
        next: (response) => {
          const ticket = Ticket.fromJson(response);
          this.ticketDataSubject.next(ticket);
        },
        error: (error) => {
          console.error('Error al obtener el ticket:', error);
        },
      });
    }).catch((error) => {
      console.error('Error al obtener el token:', error);
    });
  }
}
