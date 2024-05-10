import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Question } from '../interfaces/question';
import { Choice } from '../interfaces/choice';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})
export class PollsApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': 'csrftoken'
      }
    });
  }

  getQuestions(): Promise<Question[]> {
    return this.client.get('questions')
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao buscar perguntas:', err);
      });
  }

  getQuestion(id: number): Promise<Question> {
    return this.client.get(`questions/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao buscar pergunta:', err);
      });
  }

  getChoices(id: number): Promise<Choice[]> {
    return this.client.get(`questions/${id}/choices`)
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao buscar opções:', err);
      });
  }

  vote(choiceId: number): Promise<void> {
    return this.client.post(`choices/${choiceId}/vote/`)
      .then(() => {
        return;
      })
      .catch(err =>{
        console.error('Erro ao votar:', err);
      });
  }




}
