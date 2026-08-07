// Handles editing an existing trip using a reactive form.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTrip implements OnInit {

  // Reactive form for editing trip details.
  editForm!: FormGroup;

  // Holds the trip being edited.
  trip!: Trip;

  // Tracks form submission state.
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // Retrieve stored trip code for editing.
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert('Trip code not found.');
      this.router.navigate(['']);
      return;
    }

    // Build the edit form structure.
    this.editForm = this.formBuilder.group({
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load trip details from the API.
    this.tripService.getTrip(tripCode).subscribe({
      next: (trip: Trip) => {
        this.trip = trip;

        // Format date for date input field.
        const formattedDate = new Date(trip.start).toISOString().substring(0, 10);

        this.editForm.patchValue({
          ...trip,
          start: formattedDate
        });
      },
      error: err => console.error('Error loading trip:', err)
    });
  }

  // Submits updated trip data to the backend.
  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: () => this.router.navigate(['']),
        error: err => console.error('Error updating trip:', err)
      });
    }
  }

  // Shortcut getter for form controls.
  get f() {
    return this.editForm.controls;
  }
}
