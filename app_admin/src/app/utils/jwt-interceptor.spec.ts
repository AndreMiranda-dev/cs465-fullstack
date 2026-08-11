// src/app/utils/jwt.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt-interceptor';
import { Authentication } from '../services/authentication';

describe('JwtInterceptor (creation)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: Authentication, useValue: { getToken: () => null } }
      ]
    });
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
