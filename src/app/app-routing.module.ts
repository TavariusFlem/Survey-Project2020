import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AddAdministratorComponent } from './components/add-administrator/add-administrator.component';
import { MySurveysComponent } from './components/my-surveys/my-surveys.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentSurveyPageComponent } from './components/student-survey-page/student-survey-page.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SurveyComponent } from './components/survey/survey.component';
import { ExcelParserComponent } from './components/excel-parser/excel-parser.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      // need an empty elements component
      {path: 'create-survey', component: CreateSurveyComponent },
      {path: 'add-administrator', component: AddAdministratorComponent },
      {path: 'survey-results', component: SurveyResultsComponent },
      {path: 'my-surveys', component: MySurveysComponent },
      {path: 'change-pass', component: ChangePassComponent },
      {path: 'my-classes', component: ExcelParserComponent},
      {path: '*', redirectTo: '/login', pathMatch: 'full'}
    ]
  },

  {
    path: 'student-home',
    component: StudentHomeComponent,
    children: [
      {path: 'student-survey', component: StudentSurveyPageComponent},
      {path: 'survey/:id', component: SurveyComponent},
      {path: 'change-pass', component: ChangePassComponent },
      {path: '*', redirectTo: '/login', pathMatch: 'full'}
    ]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '*', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
