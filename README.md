# Travlr Getaways — CS‑465 Full Stack Development (MEAN)

A full‑stack travel application built for CS‑465, implementing a complete MEAN architecture with a modular Angular admin interface and a production‑ready Node/Express backend.

## Overview
Travlr is a MEAN stack application designed to demonstrate full‑stack proficiency through:
- RESTful API design
- Database modeling with MongoDB + Mongoose
- Angular component architecture
- Routing, services, and reactive forms
- Backend integration and data persistence

## Backend Architecture
The backend is structured into clear layers:

### Express Server
Handles application startup, middleware configuration, routing, and global error handling.

### MongoDB + Mongoose
Provides schema‑based data modeling and database connectivity.

### Trip API Endpoints
Implements CRUD operations for trip data:
- `GET /api/trips` — list all trips
- `GET /api/trips/:code` — retrieve a trip by code
- `GET /api/trips/details/:slug` — retrieve a trip by slug
- `POST /api/trips` — create a new trip
- `PUT /api/trips/:tripCode` — update an existing trip

### Seeded Trip Data
A `seed.js` script loads initial trip data from `trips.json` into MongoDB for development and testing.

## Frontend Architecture
The Angular admin interface includes:
- Trip listing view
- Trip card component
- Add Trip form
- Edit Trip form
- Routing and service integration
- Bootstrap UI components

## Project Purpose
Travlr demonstrates full‑stack development skills by integrating:
- REST API construction
- Database schema design
- Angular SPA architecture
- Form validation and data binding
- Deployment‑ready backend structure
