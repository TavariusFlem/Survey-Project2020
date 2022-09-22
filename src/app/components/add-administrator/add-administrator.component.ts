/*
 * This component holds the functionality that the admin user adds enters in an email to add in another administrator
 * Documentation author: Tavarius Fleming
 */
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../common.types';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.component.html',
  styleUrls: ['./add-administrator.component.css']
})
// ===========================================================================================================================
export class AddAdministratorComponent implements OnInit {

  /*
   * form control to validate the email input
   */
  email = new FormControl('', [Validators.required, Validators.email]);
  /*
   * the base url of the php script that will be called
   */
  baseUrl = 'http://localhost:8080';
// ============================================ CONSTRUCTOR =================================================================
  constructor(private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private http: HttpClient,
              private emailService: EmailService) {}
  ngOnInit(): void {}
/*===========================================================================================================================
============================================= GET ERROR MESSAGE =============================================================
===========================================================================================================================*/
/* input: gets the input from the email input field from the html
 * runtime: checks the email input to see if there is any and if there is if its in a valid email format
 * output: outputs an error message string
 */
getErrorMessage() {
// error message for invalid formatted input
if (this.email.hasError('required')) {
  return 'You must enter a value';
  }
return this.email.hasError('email') ? 'Not a valid email' : '';
}

/*===========================================================================================================================
============================================= RESET FORM ====================================================================
===========================================================================================================================*/
/* input:
 * runtime: clears the email input field in the html if the email entered is valid
 * output:
 */
resetForm() {                                                                   // clears the email input field only if the
  if (!this.email.invalid) {                                                    // field has a valid email entered
  this.email.reset();
    }
  }
/*============================================================================================================================
========================================== SEND ADMINISTRATION INVITE ========================================================
============================================================================================================================*/
/* input: the input from the email input field
 * runtime: places the email input in JSON format to send to backend function called from the email service
            saves admin data
 * output: sends an email to the email to send administration invite and enters admin in backend
 */
sendAdministrationInvite() {
  console.log(this.email.value);

  const postVars = {                                                            // this is created to have the email data in JSON format
   email : this.email.value,
   name: 'Administrator',
   type: 'Admin'                                                                // to be posted to the php script
  };

  if (!this.email.invalid) {
    this.emailService.sendEmail(postVars).subscribe(
    (str: string) => {
      if (str === 'error') {
        console.log('email failed to send');
      }
      this.resetForm();
    });
 }
  }// end of Send Administration Invite
} // end of Add Administration
