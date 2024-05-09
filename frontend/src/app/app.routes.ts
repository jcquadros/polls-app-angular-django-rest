import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'question/:id', component: QuestionDetailComponent },
  { path: 'question/:id/result', component: ResultComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
