import { TestBed } from '@angular/core/testing';

import { TicketDataJsonService } from './ticket-data-json.service';

describe('TicketDataJsonService', () => {
  let service: TicketDataJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketDataJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
