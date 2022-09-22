/*
 * This is a services file used to connect the php to the angular files contaiing
 * functions that either get or place surveys from/to the database
 * Documentation author: Tavarius Fleming
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster, Survey } from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  /*
   * the base url for where the php script is running
   */
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
/*==============================================================================
====================== SEND SURVEY =============================================
==============================================================================*/
/* Input: the JSON formatted survey data
 * Runtime: posts to the php script to save the survey data in the database
 * Output: the response from the php script
 */
  sendSurvey(data) {
    return this.http.post(`${this.baseUrl}/backend/api/saveSurvey.php`, data).pipe(
      tap(                                                                      // posts the data to the url which the php app is hosted
      (response) => {                                                           // gets the errors from the php app
      console.log(response);
    }));                                                                        // resets the email form
  }// end of send survey
/*==============================================================================
======================= GET SURVEYS ============================================
==============================================================================*/
/* Input: N/A
 * Runtime: gets all of the surveys from a users account from the database
 * Output: an observable array of the survey data type
 */
  getSurveys(): Observable<Survey[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getSurveys.php`).pipe(
      map((res: any[]) => res.map(s => Survey.fromJson(s))));
  } // end of get surveys
/*==============================================================================
======================= GET SURVEY NAMES =======================================
==============================================================================*/
/* Input:
 * Runtime: gets all of the survey names from a users account from the database
 * Output: an observable array of the survey data type
 */
  getSurveyNames(): Observable<Survey[]> {
    return this.http.get(`${this.baseUrl}/backend/api/getSurveyNames.php`).pipe(
      map((res: any[]) => res.map(s => Survey.fromJson(s))));
  }// end of get survey names
/*==============================================================================
======================= GET SURVEY =============================================
==============================================================================*/
/* Input: the surveys identification name
 * Runtime: grabs the survey based on the id given
 * Output: gets the survey in a JSON format
 */
  getSurvey(id) {
    return this.http.post(`${this.baseUrl}/backend/api/getSurvey.php`, id);
  } // end of get surveys
// =============================================================================
} // end of survey service
