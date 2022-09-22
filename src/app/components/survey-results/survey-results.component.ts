// Faith Hough
// This component contains an array to hold students and an array to hold results. modifiedText is used to hold the email value of the student once they are selected, then sends them
// to the results service
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { tap, map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Survey, ClassRoster, User, Results } from '../../common.types';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, throwError, Subscription } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { ResultsserviceService } from '../../services/Resultsservice.service';


@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  students: ClassRoster[];
  results: Results[];
  constructor(private ResultsserviceService: ResultsserviceService) { }
  selectedStudent: string;

  modifiedText: string;

// When this component is first started it will call the getRosters() method in resultsservice which will retrieve all the students for the admin signed in
  ngOnInit(): void {
    this.ResultsserviceService.getRosters().subscribe(
      students => {
      if (students) {
        this.students = students;
      }
    });
  }

// Once the student has been selected from the list their email will be sent to submit student in resultsService which will retrieve their results
  onStudentSelected(val: any) {
    this.ResultsserviceService.submitStudent(val);
  }
 }
