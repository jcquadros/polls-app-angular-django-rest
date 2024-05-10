import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor} from '@angular/common';
import { RouterLink } from '@angular/router';

import { PollsApiService } from '../../services/polls-api.service';
import { Question } from '../../interfaces/question';
import { Choice } from '../../interfaces/choice';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  question: Question = {} as Question;
  choice_set: Choice[] = [];

  constructor(
    private pollsApi: PollsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.pollsApi.getQuestion(id).then((question) => {
        this.question = question;
      });

      this.pollsApi.getChoices(id).then((choices) => {
        this.choice_set = choices;
      });
    });
  }
}
