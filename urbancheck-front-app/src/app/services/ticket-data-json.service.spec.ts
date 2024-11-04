import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Ticket } from '../models/ticket';
import { TicketDataJsonService } from './ticket-data-json.service';

describe('TicketDataJsonService', () => {
  let service: TicketDataJsonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketDataJsonService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TicketDataJsonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a ticket for the given ID', (done) => {
    const mockTicket = {
      id: '1',
      description: 'Limpieza de microbasural en la esquin.',
      // ... otras propiedades necesarias para el constructor
    };

    const idToSearch = '1';
    console.log(`>>>>DEBUG| Buscando Ticket con ID: ${idToSearch}`)
    let ticketToRetrive: Ticket;
    // Llama al método que estás probando

    service.GetTicketData(idToSearch).subscribe((ticket) => {

      console.log(`>>>>DEBUG| Encontrado ticket: \nID: ${ticket.id}; Desc: ${ticket.description}; Autor: ${ticket.createdBy}`)
      expect(ticket).toBeTruthy(); // Asegúrate de que el ticket no sea null o undefined
      ticketToRetrive = ticket//expect(ticket.id).toBe(mockTicket.id); // Asegúrate de que el ID coincida con el que buscamos
      expect(ticket.description).toBe(mockTicket.description); // Comprueba otras propiedades si es necesario
      done();
    });


    // Intercepta la solicitud HTTP y devuelve el mock
    const req = httpMock.expectOne('assets/test_data/tickets.json');
    expect(req.request.method).toBe('GET'); // Verifica que la solicitud sea de tipo GET
    req.flush([mockTicket]); // Devuelve el mock en un array como respuesta
  });
});
