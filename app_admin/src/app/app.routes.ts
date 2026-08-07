// Defines all application routes for the admin interface.

import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

export const routes: Routes = [
  // Default route showing all trips.
  { path: '', component: TripListing },

  // Route for adding a new trip.
  { path: 'add-trip', component: AddTrip },

  // Route for editing an existing trip.
  { path: 'edit-trip', component: EditTrip }
];
