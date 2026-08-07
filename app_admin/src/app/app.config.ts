// Configures Angular providers including routing and HTTP client.

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Registers application routes.
    provideRouter(routes),

    // Enables HttpClient throughout the app.
    provideHttpClient()
  ]
};
