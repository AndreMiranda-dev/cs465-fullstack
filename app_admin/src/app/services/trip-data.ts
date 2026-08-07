// Provides all API operations for trip data.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Base API URL for all trip endpoints.
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // Retrieves all trips.
  getTrips() {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  // Adds a new trip.
  addTrip(formData: any) {
    return this.http.post<any>(`${this.baseUrl}/trips`, formData);
  }

  // Retrieves a single trip by code.
  getTrip(code: string) {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${code}`);
  }

  // Updates an existing trip.
  updateTrip(formData: any) {
    return this.http.put<any>(`${this.baseUrl}/trips/${formData.code}`, formData);
  }
}
