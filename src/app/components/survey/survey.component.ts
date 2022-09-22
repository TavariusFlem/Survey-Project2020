import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { Survey, Question, Answer } from '../../common.types';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
surveyID: string;
survey: Survey;
loaded = false;
count = 0;
results = {surveyID: this.surveyID,
           answers: [{
             questionText: '',
             answerText: ''}]
           };

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.surveyID = params['id'];
      const surveyObj = {surveyID: this.surveyID};
      this.surveyService.getSurvey(surveyObj).subscribe(
        survey => {
        if (survey) {
          this.survey = Survey.fromJson(survey);
          this.loaded = true;
        }
      });
    });
  }

  addAnswer(qText, aText) {
    const temp = {
      questionText: qText,
      answerText: aText
    };
    this.results.answers.push(temp);
  }

  onSubmit() {
    console.log(this.results);
  }

}
