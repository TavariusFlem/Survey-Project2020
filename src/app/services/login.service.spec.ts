import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const mockRouter = jasmine.createSpyObj('router', ['navigateByUrl']);

  beforeEach(() => {
  TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Router, useValue: mockRouter },
        LoginService
      ]
    });
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
