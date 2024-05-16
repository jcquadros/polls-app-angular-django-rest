import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.isAuthenticated().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.apiService.whoAmI().subscribe(resp => {
          this.username = resp.user.username;
        });
      }
    });
  }

  logout() {
    this.apiService.logout()
      .subscribe(() => {
        console.log('Logout successful');
        this.isLoggedIn = false;
        this.username = '';
        // redirecionar para a home
        window.location.href = '/';
      }, error => {
        console.error('Logout failed:', error);
        // Tratar erros, se necessário
      });
  }
}
