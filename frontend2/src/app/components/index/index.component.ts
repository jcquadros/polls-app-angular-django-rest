import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Question } from '../../interfaces/question';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  questions: Question[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Verifica se o usuário está autenticado
    this.apiService.isAuthenticated().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      } else {
        // Se autenticado, busca as perguntas
        this.apiService.getQuestions().subscribe(
          (questions: Question[]) => {
            this.questions = questions;
          },
          error => {
            console.error('Erro ao buscar perguntas:', error);
          }
        );
      }
    });
  }
}
