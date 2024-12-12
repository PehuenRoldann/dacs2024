import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Define el modelo de datos para UserDTO
export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  direccion: string;
  dni: string;
  uuid: string;
  fechaNacimiento: string; // Formato "yyyy-mm-dd"
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = `${environment.backendForFrontendUrl}/keycloak/user/create`

  constructor(private http: HttpClient) {}

  createUser(userDTO: UserDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, userDTO, { headers });
  }

  
}
