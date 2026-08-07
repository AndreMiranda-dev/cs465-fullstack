// Lists all trips and handles navigation to Add Trip.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListing implements OnInit {

  // Holds all trips returned from the API.
  trips: Trip[] = [];

  // Message displayed above the trip list.
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {
    console.log('TripListing constructed');
  }

  // Retrieves all trips from the backend.
  private loadTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        console.log('Trips:', trips);
        this.trips = trips;

        this.message = trips.length
          ? `There are ${trips.length} trips available.`
          : 'There were no trips retrieved from the database.';
      },
      error: (err: any) => console.error('Trip load error:', err)
    });
  }

  // Lifecycle hook: loads trips on component init.
  ngOnInit(): void {
    console.log('TripListing ngOnInit');
    this.loadTrips();
  }

  // Navigates to the Add Trip page.
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}
