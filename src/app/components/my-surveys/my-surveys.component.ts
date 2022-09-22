/* NOTE: this component is intended to have an editable, clickable list in the html which will display the list
 * This component retreives and displays the surveys from the database in a mat list in the html
 * Documentation author: Tavarius Fleming
 */

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClassRoster, Survey } from '../../common.types';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {
  /*
   * surveys that will be displayed in the html file
   */
  surveys: Survey[];
// ========================= DATA MEMBERS ========================================
  constructor(private surveyService: SurveyService) { }

/*==============================================================================
================================================================================
==============================================================================*/
/* Input:
 * Runtime: Gets the surveys from the data base calling the survey service
 * Output: an array of the Survey class
 */
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(
      surveys => {
      if (surveys) {
        this.surveys = surveys;
      }
    });
  }// end of on init
// =============================================================================
}// end of class
