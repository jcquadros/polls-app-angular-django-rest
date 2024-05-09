import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      const resp = await this.authService.whoAmI();
      this.username = resp.user.username;
      
    }
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logout successful');
        this.isLoggedIn = false;
        this.username = '';
        
        // redirecionar para a home
        window.location.href = '/';
        
      })
      .catch(error => {
        console.error('Logout failed:', error);
        // Tratar erros, se necessário
      });
  }
}
