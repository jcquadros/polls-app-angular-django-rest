import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(private authService: AuthService) {

  }

  login(){
    this.authService.login(this.username, this.password)
      .then(data => {
        // next page
        window.location.href = '/';
      }
      )
      .catch(err => {console.error('Falha', err);
        this.errorMessage = 'Falha no Login. Por favor cheque suas credenciais.'
      })
  }
}
