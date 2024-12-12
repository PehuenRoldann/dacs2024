import { Component, Input, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { UserServiceService, UserDTO } from 'src/app/services/user-service.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit{
  

  @Input({ required: true }) modalId: string = '';

  public perfilUsuario: KeycloakProfile | null = null;

  constructor(private keycloak: KeycloakService, private userService: UserServiceService) {}

  async ngOnInit(): Promise<void> {

    this.perfilUsuario = await this.keycloak.loadUserProfile();
    console.log(this.perfilUsuario)

    const userDTO = {
      firstName: this.perfilUsuario.firstName!,
      lastName: this.perfilUsuario.lastName!,
      email: this.perfilUsuario.email!,
      username: this.perfilUsuario.username!,
      direccion: "",
      dni: "",
      uuid: this.perfilUsuario.id!,
      fechaNacimiento: "1999-01-01" // Formato "yyyy-mm-dd"
    };

    this.userService.createUser(userDTO).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente:', response);
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      },
    });

  }



  LogOut() {
    console.log("Cerrando sesión...")
    this.keycloak.logout();
  }
}
