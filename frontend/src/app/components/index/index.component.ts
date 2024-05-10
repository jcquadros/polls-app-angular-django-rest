import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question';
import { PollsApiService } from '../../services/polls-api.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent implements OnInit{
  questions = [] as Question[];
  isLoggedIn: boolean = false;

  constructor(
    private pollsApi: PollsApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.isAuthenticated().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }else{
        this.pollsApi.getQuestions().then(questions => {
          this.questions = questions;
        }); 
      }
    });

    
  }
}
