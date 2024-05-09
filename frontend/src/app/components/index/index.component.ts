import { Component, OnInit } from '@angular/core';
import { Question } from '../../interfaces/question';
import { PollsApiService } from '../../services/polls-api.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent{
  questions = [] as Question[];
  constructor(private pollsApi: PollsApiService) { }



  imprimirMensagem(): void {
    console.log('Botão pressionado! Uma mensagem foi impressa.');
    this.pollsApi.getQuestions().then(questions => {
      this.questions = questions;
      console.log('Perguntas:', questions);
    });
  }
}
