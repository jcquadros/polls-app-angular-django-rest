import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Choice } from '../../interfaces/choice';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
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

  async vote() {
    if (!this.selectedChoice) {
      this.error_message = 'Por favor, selecione uma opção antes de votar.';
      return;
    }
    try {
      await this.apiService.vote(this.selectedChoice).toPromise();
      this.router.navigate(['/question', this.question.id, 'result']);
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  }
}
