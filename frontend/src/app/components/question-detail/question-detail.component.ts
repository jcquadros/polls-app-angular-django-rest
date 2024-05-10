import { Component } from '@angular/core';
import { Question } from '../../interfaces/question';
import { Choice } from '../../interfaces/choice';
import { PollsApiService } from '../../services/polls-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.css'
})
export class QuestionDetailComponent {
  question: Question = {} as Question;
  choice_set: Choice[] = [];
  error_message: string = '';
  selectedChoice: number | null = null;

  // Injetando o serviço PollsService
  constructor(
    private pollsApi: PollsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  // Ao iniciar o componente, recuperar a pergunta e as opções
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

  // Método para votar em uma opção
  async vote() {
    if (!this.selectedChoice) {
      this.error_message = 'Por favor, selecione uma opção antes de votar.';
      return;
    }
    this.pollsApi.vote(this.selectedChoice).then(() => {
      this.router.navigate(['/question', this.question.id, 'result']);
    });
  }
}
