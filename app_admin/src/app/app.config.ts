// Configures Angular providers including routing and HTTP client.

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Registers application routes.
    provideRouter(routes),

    // Import HttpClientModule so HttpClient and interceptors work as expected
    importProvidersFrom(HttpClientModule),

    // Register the JWT interceptor provider exported from jwt.interceptor.ts
    authInterceptProvider
  ]
};
