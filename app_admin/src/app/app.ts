// Root application shell that hosts all routed views.

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  // Reactive title signal used in the root template.
  protected readonly title = signal('Travlr Getaways Admin!');
}
