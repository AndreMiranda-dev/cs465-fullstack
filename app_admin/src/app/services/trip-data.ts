// Provides all API operations for trip data.

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip';
import { Authentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private baseUrl = '/api';

  constructor(
    private http: HttpClient,
    private auth: Authentication
  ) {}

  // Helper: Build authorization headers only when a token exists
  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    if (!token) {
      return new HttpHeaders(); // no Authorization header when token is missing
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Retrieves all trips (public or protected depending on backend)
  getTrips() {
    const token = this.auth.getToken();
    const options = token ? { headers: this.getAuthHeaders() } : {};
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`, options);
  }

  // Adds a new trip (protected)
  addTrip(formData: any) {
    return this.http.post<any>(
      `${this.baseUrl}/trips`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  // Retrieves a single trip by code (public)
  getTrip(code: string) {
    const token = this.auth.getToken();
    const options = token ? { headers: this.getAuthHeaders() } : {};
    return this.http.get<Trip>(`${this.baseUrl}/trips/${code}`, options);
  }

  // Updates an existing trip (protected)
  updateTrip(formData: any) {
    return this.http.put<any>(
      `${this.baseUrl}/trips/${formData.code}`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  // Deletes a trip (protected)
  deleteTrip(code: string) {
    return this.http.delete<any>(
      `${this.baseUrl}/trips/${code}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
