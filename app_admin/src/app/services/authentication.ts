import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '../storage';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private apiBaseUrl = 'http://localhost:3000/api';
  private storage = new Storage();

  // Reactive login state
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // initialize from stored token if present
    const token = this.getToken();
    if (token) {
      this._isLoggedIn$.next(true);
    }
  }

  // --- Network calls ---
  public login(user: User) {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`, user);
  }

  // --- Token helpers ---
  public saveToken(token: string): void {
    this.storage.saveToken(token);
    this._isLoggedIn$.next(true);
  }

  public getToken(): string | null {
    return this.storage.getToken();
  }

  public logout(): void {
    this.storage.removeToken();
    this._isLoggedIn$.next(false);
  }

  // --- Reactive API for components/templates ---
  public isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  // synchronous helper for TS code
  public isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  // explicit setters (optional convenience)
  public setLoggedIn(): void {
    this._isLoggedIn$.next(true);
  }

  public setLoggedOut(): void {
    this._isLoggedIn$.next(false);
  }

  // --- user info helper ---
  public getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      email: payload.email,
      password: payload.name
    };
  }
}
