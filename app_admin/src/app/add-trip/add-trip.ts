// Handles creating a new trip using a reactive form.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTrip implements OnInit {

  // Reactive form for adding a new trip.
  public addForm!: FormGroup;

  // Tracks form submission state.
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // Build the add-trip form structure.
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Submits new trip data to the backend.
  public onSubmit(): void {
    this.submitted = true;

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  // Shortcut getter for form controls.
  get f() {
    return this.addForm.controls;
  }
}
