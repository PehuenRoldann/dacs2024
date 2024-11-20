import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketStates } from 'src/app/models/ticketStates';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent {

  @Input({required: true}) ticketState!: TicketStates;

  COLOR_MAP_HEX = new Map<string, string>([
    [TicketStates.Creado, '#FFE700'],
    [TicketStates.EnRevision, '#FF9D3D'],
    [TicketStates.Rechazado, '#CC2B52'],
    [TicketStates.Demorado, '#9B7EBD'],
    [TicketStates.Programado, '#9EDF9C'],
    [TicketStates.Reprogramado, '#62825D'],
    [TicketStates.Resuleto, '#608BC1'],
    [TicketStates.Cerrado, '#CBDCEB'],
    [TicketStates.Cancelado, '#AF1740']
  ]);

}
