/*
 * This is a services file used to connect the php to the angular containing functions that
 * email users for surveys or gets classes from the database
 * Documentation author: Tavarius Fleming
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ClassRoster } from '../common.types';

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  /*
   * Base url for the php scripts
   */
  baseUrl = 'http://localhost:8080';
// ================ DATA MEMBERS ===============================================
  constructor(private http: HttpClient) { }
/*==============================================================================
================= HANDLE ERROR =================================================
==============================================================================*/
/* Input: error type HttpErrorResponse given by the http functions
 * Runtime: displays the error message given by the php call
 * Output: returns an exception that an error has been thrown
 */
private handleError(error: HttpErrorResponse) {
  console.log(error);
  return throwError('Error! Something went wrong. ');
  }// end of handle error

/*==============================================================================
================= SEND EMAIl ===================================================
==============================================================================*/
/* Input: the users account information
 * Runtime: sends the user an email via the backendMailer php script
 * Output: either the data given by the post function or the error
 */
sendEmail(data) {
  return this.http.post(`${this.baseUrl}/backend/api/backendMailer.php`, data).pipe(
    tap(                                                                        // posts the data to the url which the php app is hosted
    (response) => {                                                             // gets the errors from the php app
    console.log(response);
  }));                                                                          // resets the email form
} // end of sendEmail
/*==============================================================================
========================= SEND ROSTER ==========================================
==============================================================================*/
/* Input: the JSON formatted roster data
 * Runtime: sends the data to the php script and stores it in the data base
 * Output: returns the response string which holds either an error message or confirmation of sending
 */
sendRoster(data) {
  return this.http.post(`${this.baseUrl}/backend/api/backendRosterMailer.php`, data).pipe(
    tap(                                            // posts the data to the url which the php app is hosted
    (response) => {                                                             // gets the errors from the php app
    console.log(response);
  }));
} // end of sendRoster
/*==============================================================================
======================= GET ROSTERS ============================================
==============================================================================*/
/* Input: N/A
 * Runtime: calls the getRoster php script to gain the class rosters
 * Output: gets the roster data in Class roster format
 */
getRosters(): Observable<ClassRoster[]> {
  return this.http.get(`${this.baseUrl}/backend/api/getRoster.php`).pipe(
    map((res: any[]) => res.map(c => ClassRoster.fromJson(c))));
}// end of getRosters
// =============================================================================
}// end of email service
