import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question';
import { Choice } from '../../interfaces/choice';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
  question: Question = {} as Question;
  choice_set: Choice[] = [];
  error_message: string = '';
  selectedChoice: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.isAuthenticated().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.getQuestion(id).subscribe((question: any) => {
        this.question = question;
      });

      this.apiService.getChoices(id).subscribe((choices: any[]) => {
        this.choice_set = choices;
      });
    });
  }
  
}
