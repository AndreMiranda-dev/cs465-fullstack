// Displays a single trip and handles navigation to the edit workflow.

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard {

  // Trip data passed in from the listing component.
  @Input() trip!: Trip;

  constructor(private router: Router) {}

  // Stores the trip code and navigates to the edit page.
  editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}
