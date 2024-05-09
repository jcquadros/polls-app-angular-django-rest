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
    });
  }

  getQuestions(): Promise<any> {
    return this.client.get('questions')
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao buscar perguntas:', err);
      });
  }



}
