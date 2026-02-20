import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  // Mock hardcoded user
  private mockUser = {
    email: 'seanmatear@gmail.com',
    password: '123456',
  };

  constructor(private router: Router) {}

  login() {
    if (this.email === this.mockUser.email && this.password === this.mockUser.password) {
      this.error = '';
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}
