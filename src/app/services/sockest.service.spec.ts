import { TestBed } from '@angular/core/testing';

import { SocketsService } from './sockets.service';

describe('SockestService', () => {
  let service: SocketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
