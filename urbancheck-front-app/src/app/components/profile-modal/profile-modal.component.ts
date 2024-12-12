import { Component, Input, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit{
  

  @Input({ required: true }) modalId: string = '';

  public perfilUsuario: KeycloakProfile | null = null;

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit(): Promise<void> {

    this.perfilUsuario = await this.keycloak.loadUserProfile();
  }

  LogOut() {
    console.log("Cerrando sesión...")
    this.keycloak.logout();
  }
}
