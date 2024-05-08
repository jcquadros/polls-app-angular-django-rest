import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.password)
      .then(data => {
        console.log('Registration successful:', data);
        // Redirecionar para outra página após o registro bem-sucedido
      })
      .catch(error => {
        console.error('Registration failed:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      });
  }
}
