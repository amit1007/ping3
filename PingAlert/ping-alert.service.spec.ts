import { TestBed, inject } from '@angular/core/testing';

import { PingAlertService } from './ping-alert.service';

describe('PingAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PingAlertService]
    });
  });

  it('should be created', inject([PingAlertService], (service: PingAlertService) => {
    expect(service).toBeTruthy();
  }));
});
