import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  currentUser: boolean | null = null;
  registrationToggle: boolean = false;
  username: string = '';
  password: string = '';

  url: string = 'http://127.0.0.1:8000'

  constructor(private http : HttpClient){}

  ngOnInit() {
    this.checkCurrentUser();
  }

  checkCurrentUser() {
    this.http.get<any>(this.url + '/api/user').subscribe(
      res => {
        this.currentUser = true;
        console.log('conseguiu');
      },
      err => {
        this.currentUser = false;
        console.log("não conseguiu");
      }
    );
  }

  updateFormBtn() {
    this.registrationToggle = !this.registrationToggle;
  }

  submitRegistration(data: { email: string, username: string, password: string }) {
    //
  }

  submitLogin(data: any) {
    this.http.post(this.url + '/api/login', {
      username: 'test1',
      password: 'test12345'
    }).subscribe(
      res => {

        console.log(res);
        this.checkCurrentUser();
      }
    );
  }

  submitLogout() {
    //
  }
}
