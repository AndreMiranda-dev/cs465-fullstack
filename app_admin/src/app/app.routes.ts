// Defines all application routes for the admin interface.

import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { inject } from '@angular/core';
import { Authentication } from './services/authentication';

export const routes: Routes = [

  // Public route showing all trips.
  { path: '', component: TripListing },

  // Login route
  { path: 'login', component: Login },

  // Protected route for adding a new trip.
  {
    path: 'add-trip',
    component: AddTrip,
    canActivate: [() => {
      const auth = inject(Authentication);
      return auth.isLoggedIn();
    }]
  },

  // Protected route for editing an existing trip.
  {
    path: 'edit-trip',
    component: EditTrip,
    canActivate: [() => {
      const auth = inject(Authentication);
      return auth.isLoggedIn();
    }]
  }
];
