import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  credentials: User = {
    email: '',
    password: ''
  };

  error: string = '';

  constructor(
    private auth: Authentication,
    private router: Router
  ) {}

  public login(): void {
    this.auth.login(this.credentials).subscribe({
      next: (response) => {
        this.auth.saveToken(response.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Login failed. Please check your email and password.';
      }
    });
  }
}
