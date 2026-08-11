import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  constructor(
    public auth: Authentication,   // <-- made public so template can use auth.isLoggedIn$() | async
    private router: Router
  ) {}

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
