// Faith Hough
// This service handles all of the data transfer between the login component, change-pass component, and php code.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CaughtError } from '../common.types';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private email: string;

  baseUrl = 'http://localhost:8080';
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // This method is used to retrieve the email of the user that is currently logged in
  getEmail(): string {
    return this.email;
  }

  // This method uses te email and password gathered from the login component and sends it to login.php to be validated. It will return
  //the users type(admin, standard) to the router so that it knows whether to display home.component or student-home.component
  login(email: string, password: string) {
    const credentials = JSON.stringify({ email, password });
    return this.http
    .post(`${this.baseUrl}/backend/api/login.php`, credentials).pipe(
      tap(
        (response: string) => {
          // authorize then
          if (response === 'admin') {
            this.email = email;
            this.router.navigateByUrl('/home');
          } else if (response === 'standard') {
            this.router.navigateByUrl('/student-home');
            this.email = email;
          }
        }
      )
    );
  }

  // This method is called when a valid form has been submitted in change-pass.component. It will revied the oldPass and newPass that the user has input
  // and validate it in changePass.php. If it is valid the users password will be sucessfully changed and returned to the front
  changePass(newPassword: string, oldPassword: string) {
    const e = this.email;
    const credentials = JSON.stringify({ e, oldPassword, newPassword });
    return this.http
    .post(`${this.baseUrl}/backend/api/changePass.php`, credentials).pipe(
      tap()
    );
  }
}
