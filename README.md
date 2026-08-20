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

---

# Final Project Reflection

## Architecture

This project brought together two different approaches to frontend development: traditional Express-rendered HTML/JavaScript pages and a modern Angular single‑page application (SPA). The customer-facing portion uses Express to deliver server-rendered views that are simple, fast, and SEO-friendly, matching the structure shown in the Travlr wireframes. The administrative side uses Angular to provide a dynamic SPA with client-side routing, reusable components, and reactive forms. Working with both approaches highlighted how Express templates are tightly coupled to backend logic, while Angular emphasizes modular architecture and richer user interaction.

The backend uses a NoSQL MongoDB database because its document-based structure aligns naturally with JSON data flowing through the MEAN stack. Trip information, user accounts, and reservation details fit cleanly into flexible schema designs, allowing the application to evolve without the rigid constraints of a relational database. MongoDB’s scalability and seamless integration with Mongoose made it a strong fit for this project.

## Functionality

JSON played a central role in connecting the frontend and backend. Although JSON resembles JavaScript, it is a data format rather than executable code. JSON provides a predictable structure for API responses, allowing the Express backend to send trip data, authentication results, and update confirmations to both the public site and the Angular SPA. This consistency made it easy for Angular services to consume API endpoints and bind the returned data to components.

Throughout the project, I refactored several areas to improve functionality and efficiency. I consolidated repeated API logic into reusable Angular services, reduced duplication in UI components, and improved form handling by using reactive forms. Reusable components not only simplify development but also ensure consistent styling and behavior across the application.

## Testing

Testing the API required verifying that each endpoint behaved correctly for both public and protected routes. GET requests for trip listings and individual trip details were straightforward, but POST, PUT, and DELETE operations required additional testing because they were restricted to authenticated admin users. Adding JWT-based authentication introduced new challenges: every protected request needed a valid token, and the backend had to reject unauthorized attempts. Tools like Postman helped validate that endpoints returned the correct status codes, enforced security rules, and responded with the expected JSON structures. This reinforced the importance of understanding HTTP methods, endpoint design, and layered security in a full stack application.

## Reflection

This course has been a major step toward my professional goals. Building a full stack application from the ground up — including frontend development, backend logic, database integration, and security — strengthened my confidence in working across all layers of a modern web application. I developed skills in Angular, Express, RESTful API design, MongoDB, authentication, and component-based architecture. I also gained experience writing documentation, testing endpoints, and refactoring code for maintainability. These skills make me a more competitive candidate in the software field and give me a strong foundation for future projects that require full stack development.
