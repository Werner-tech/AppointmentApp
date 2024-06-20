import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.username.trim() !== '' && this.password === 'Ftorres@9') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.snackBar.open('Invalid credentials', 'Close', {
        duration: 3000,
      });
    }
  }
}
