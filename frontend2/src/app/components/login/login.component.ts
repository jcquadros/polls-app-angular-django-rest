import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  login() {
    if (this.username && this.password) {
      this.apiService.login(this.username, this.password)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            window.location.href = '/';
          },
          (error) => {
            console.error('Login failed:', error);
            this.errorMessage = 'Falha no Login. Por favor cheque suas credenciais.';
          }
        );
    } else {
      console.error('Username and password are required');
      // Exibir mensagem de erro ao usuário
    }
  }
}
