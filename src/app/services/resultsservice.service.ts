//Faith Hough
//This service acts as a middle man between the php code and the survey-results component. The important variables are passed to these methods which call the php code
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster, Survey , User, Results} from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class ResultsserviceService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  modifiedText: string;

// This method recieves the student email, which is stored in modified Text, sends that information to the php file getResults, Then is sent back all of the
// survey results for that student in type Results(in common.types) The array of questions and answers should be sent back to the survey-results component
  submitStudent(val: any) {
    this.modifiedText = val;
    console.log(JSON.stringify(this.modifiedText));
    return this.http.post(`${this.baseUrl}/backend/api/getResults.php`, this.modifiedText)
    .pipe(tap((response) => {console.log(response); }));
  }

// This method is called at the start of survey-results. It does not recieve any input, but it returns an array of type classRoster that contains all of the
// students that the user logged in is the admin of
  getRosters(): Observable<ClassRoster[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getRoster.php`).pipe(
      map((res: any[]) => res.map(c => ClassRoster.fromJson(c))));
  }
}
