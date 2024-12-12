import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAP_SERVICE_INTERFACE_TOKEN, MapServiceInterface } from 'src/app/interfaces/map.service.interface';
import { TICKET_SERVICE_INTERFACE_TOKEN, TicketServiceInterface } from 'src/app/interfaces/ticket.service.interface';
import MunicipalDependencies, { DEPENDENCIES_MAP_IDS, getDependencyId } from 'src/app/models/municipalDependencie';
import { Ticket } from 'src/app/models/ticket';


@Component({
  selector: 'app-ticket-creation-modal',
  templateUrl: './ticket-creation-modal.component.html',
  styleUrls: ['./ticket-creation-modal.component.css'],
})
export class TicketCreationModalComponent implements OnInit {
  @Input({ required: true }) modalId!: string;

  public readonly maxLengthDesc: number = 250;
  public processStep: number = 0;
  public ticket = new Ticket();

  public cancelCreation = new EventEmitter();


  constructor(
    @Inject(TICKET_SERVICE_INTERFACE_TOKEN) private ticketService: TicketServiceInterface,
    @Inject(MAP_SERVICE_INTERFACE_TOKEN) private mapService: MapServiceInterface
  ) {}


  ngOnInit(): void {
    
    this.mapService.lastCoords$.subscribe(coords => {
      this.ticket.lat = coords.lat;
      this.ticket.lng = coords.lng;
    })
  }

  /**
   * returns an array with the names of the dependencies
   */
  get MunicipalDependenciesArr() {
    let dependenciesArr: string[] = [];

    for (let dependency of Object.values(MunicipalDependencies)) {
      dependenciesArr.push(dependency);
    }

    return dependenciesArr;
  }


  AddTicket() {

    const description = this.ticket.description;
    const longitud = this.ticket.lng;
    const latitud = this.ticket.lat;
    const dependencyId = getDependencyId(this.ticket.dependency) || 1;

    this.ticketService.AddTicket(description, dependencyId!, longitud, latitud)
      .subscribe({
        next: (ticket: Ticket) => {
          console.log('Ticket creado exitosamente:', ticket);
          // Aquí puedes actualizar el estado o mostrar un mensaje al usuario
        },
        error: (error) => {
          console.error('Error al crear el ticket:', error);
          // Manejo de errores: muestra un mensaje o registra el error
        }
      });
  }


  setDependency(selectedValue: string) {
    const key = Object.keys(MunicipalDependencies).find(
      (k) =>
        MunicipalDependencies[k as keyof typeof MunicipalDependencies] ===
        selectedValue
    );

    if (key) {
      this.ticket.dependency = key as MunicipalDependencies;
    }
  }

  nextStep() {
    this.processStep++;
    this.ticket.dateTime = Date.now();
  }
  prevStep() {
    this.processStep--;
  }

  CancelTicket() {
    this.ticket = new Ticket();
    this.processStep = 0;
    this.cancelCreation.emit();
  }

  formatDateTime(timestamp: number): string {
    const date = new Date(timestamp);

    const day = ('0' + date.getDate()).slice(-2); // Día con ceros a la izquierda
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes con ceros a la izquierda
    const year = date.getFullYear(); // Año
    const hours = ('0' + date.getHours()).slice(-2); // Horas con ceros a la izquierda
    const minutes = ('0' + date.getMinutes()).slice(-2); // Minutos con ceros a la izquierda

    return `${day}/${month}/${year} ${hours}:${minutes}`; // Retorna el formato deseado
  }
}
