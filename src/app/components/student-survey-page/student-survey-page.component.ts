import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../common.types';

@Component({
  selector: 'app-student-survey-page',
  templateUrl: './student-survey-page.component.html',
  styleUrls: ['./student-survey-page.component.css']
})
export class StudentSurveyPageComponent implements OnInit {
  selectedName: string;
  surveys: Survey[];
  constructor(private router: Router,
              private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveyNames().subscribe(
      names => {
      if (names) {
        this.surveys = names;
      }
    });
  }

  openSurvey(id) {
    this.router.navigateByUrl(`/student-home/survey/${id}`);
  }

}// end of component
