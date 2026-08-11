import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResponse } from './auth-response';

describe('AuthResponse', () => {
  let component: AuthResponse;
  let fixture: ComponentFixture<AuthResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResponse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
