import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://127.0.0.1:8000',
    });
  }

  async login(username: string, password: string): Promise<any> {
    return this.client.post('/api/login', { username, password })
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao logar usuario:', err);
      });
  }

  logout(): Promise<any> {
    return this.client.post('/api/logout')
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao deslogar usuario:', err);
      });
  }

  register(username: string, password: string): Promise<any> {
    return this.client.post('/api/register', { username, password })
      .then(res => {
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao registrar usuario:', err);
      });
  }

  whoAmI(): Promise<any> {
    return this.client.get('/api/user')
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err =>{
        console.error('Erro ao verificar usuario:', err);
      });
  }

  isAuthenticated(): Promise<boolean> {
    return this.client.get('/api/is-authenticated')
      .then(res => {
        console.log(res.data.authenticated);
        return res.data.authenticated; 
      })
      .catch(err =>{
        console.error('Erro ao verificar autenticação:', err);
        return false;
      });  
  }
}
