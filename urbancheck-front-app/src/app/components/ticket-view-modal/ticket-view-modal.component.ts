import { Component, Inject, Input, OnInit } from '@angular/core';
import { TICKET_SERVICE_INTERFACE_TOKEN, TicketServiceInterface } from 'src/app/interfaces/ticket.service.interface';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-view-modal',
  templateUrl: './ticket-view-modal.component.html',
  styleUrls: ['./ticket-view-modal.component.css'],
})
export class TicketViewModalComponent{
  @Input({ required: true }) modalId: string = '';
  isTicketLoaded: boolean = false;
  ticket!: Ticket;

  constructor(
    @Inject(TICKET_SERVICE_INTERFACE_TOKEN)
    private ticketDataService: TicketServiceInterface
  ) {}

  GetTicketWithId(id: string): void {
    this.isTicketLoaded = false;
    this.ticketDataService.GetTicketData(id).subscribe((data) => {
      this.ticket = data;
      console.log(this.ticket)
      this.isTicketLoaded = true;
    });
  }



  get dateFromTicket(): string{
    let date = new Date(this.ticket.dateTime);
    const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea a 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (0-11) y lo ajusta a 1-12
    const year = date.getFullYear(); // Obtiene el año
    return `${day}/${month}/${year}`; // Retorna la fecha en formato "DD/MM/YYYY"
  }
}
