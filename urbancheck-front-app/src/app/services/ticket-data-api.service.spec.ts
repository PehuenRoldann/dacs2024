import { TestBed } from '@angular/core/testing';

import { TicketDataApiService } from './ticket-data-api.service';

describe('TicketDataApiService', () => {
  let service: TicketDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
