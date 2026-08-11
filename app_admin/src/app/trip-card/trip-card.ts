// Displays a single trip and handles navigation to the edit workflow.

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard {

  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private auth: Authentication
  ) {}

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  editTrip(trip: Trip): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}
