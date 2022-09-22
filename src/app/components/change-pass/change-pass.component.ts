// Faith Hough
// This component will allow the user currently logged in to change their password by taking their oldpassword and allowing them to input and confirm a new password then sending
// it to the backend php to ensure the old password is correct, then replace it with the new one
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable, throwError, Subscription } from 'rxjs';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

// Implement ErrorStateMatcher to watch for change(dirty) or an invalid form in the confirmPass card
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnDestroy {

  private subscription = new Subscription();

  // Instantiate the form and the values that will be taken from it. The validators enforce the user to input a password that is at least 6 characters long
  // newPass and confirmPass are currently set up to only allow passwords a-z, A-Z, 0-9. This should be changed to allow special characters, however, don't allow
  // the sequence ';#
  changePassForm: FormGroup;
  oldPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  newPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);
  confirmPass = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    public snackBar: MatSnackBar) {

      // when changePass is executed it uses changePassForm to gather all of the variables and validate them
      this.changePassForm =
      this.fb.group({oldPass: this.oldPass,
          newPass: this.newPass,
          confirmPass: this.confirmPass},
          {
            validator: this.passwordMatchValidator
          });
        }
        matcher = new MyErrorStateMatcher();

        //this will check if newPass and confirmPass are the same, if not mismatch is set to true, which triggers a mat-error in the html
        passwordMatchValidator(g: FormGroup) {
         return g.get('newPass').value === g.get('confirmPass').value
            ? null : { mismatch: true };
        }

        //the subscription must be unsubscribed after the form is reset so that it can be reset
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }

        //this method sends oldPass and newPass to the loginService method, changePass, which sends the data to php to be validated and changed.
        //this method also checks if the password has successfully been changed or not
        changePass() {
          const newPassword = this.changePassForm.get('newPass').value;
          const oldPassword = this.changePassForm.get('oldPass').value;
          this.loginService.changePass(newPassword, oldPassword).subscribe(
        (str: string) => {
          if (str === 'success') {
            this.snackBar.open('Password Changed', 'Okay', {
              duration: 3000
            });
          } else if (str !== 'success') {
            this.snackBar.open('Password Change Failed', 'Okay', {
              duration: 3000
            });
          }
        }
      );
      //after the form is submitted it is cleared
          this.changePassForm.reset();
        }

      }
