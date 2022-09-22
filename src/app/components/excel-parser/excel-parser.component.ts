/**
 * This component is the my classes page. The component parses an excel file in the explained format
 * and gets the names emails and groups from the excel file and creates accounts for the users in the database as well as
 * places a new class roster containing those students with an ID given by the class name.
 * Documentation author: Tavarius Fleming
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { MatSelectionListChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectionList } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { User, ClassRoster } from '../../common.types';


@Component({
  selector: 'app-excel-parser',
  templateUrl: './excel-parser.component.html',
  styleUrls: ['./excel-parser.component.css']
})
export class ExcelParserComponent implements OnInit {
  /**
   * the string array that temporarily holds the emails of the students
   */
  emailArr = [];
  /**
   * the JSON type that holds the excel workSheet
   */
  workSheet = null;
  /**
   * string array that temporarily holds the names of the students
   */
  nameArr = [];
  /**
   * array that holds the Student type data
   */
  students = [];
  /**
   * form group with the opton classRosterName which is held in the html file to validate if there is inout in the field
   */
  classForm = this.fb.group({ classRosterName: ['', Validators.required], });
  /**
   * an array that holds the Roster data type
   */
  rosters: ClassRoster[];
  /**
   * string that holds the input of the class roster name to keep track of the value
   */
  inputValue;
  /**
   * integer that is used to increment the number value of the excel cell index
   */
  cellIndexNumber = 1;
  /**
   * string array that holds the group names of the students
   */
  groupArr = [];
  /**
   * beginning of the url that the php scripts will be running on
   */
  baseUrl = 'http://localhost:8080';                                                // base URL of the php script
// ============= DATA MEMBERS ============================================================================
   @ViewChild('studentList') studentList: MatSelectionList;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private emailService: EmailService) {}// end of constructor

  ngOnInit(): void {
    this.emailService.getRosters().subscribe(
      rosters => {
      if (rosters) {
        this.rosters = rosters;
      }
    });
  }// end of ngOnInit
/*========================================================================================================
===================== ON FILE CHANGE =====================================================================
========================================================================================================*/
/* input: Takes in an excel file as an event from the input tag in the html file
 * runtime: gets the workSheet from the workBook from the file and parses the file calling methods to fill the following data structures:
          rosters, students
 * output: an array of students and a new class roster
 */
onFileChange(ev) {
  this.emailArr = [];
  this.workSheet = null;
  this.nameArr = [];
  this.students = [];
  this.rosters = [];
  this.groupArr = [];                                                           // resets the data structures for new submission
  const cellIndex = 'A1';
                                                                                // the excel sheet is going to be in a desired format
  let workBook = null;

  const reader = new FileReader();
  const file = ev.target.files[0];

  reader.onload = (event) => {
    const data = reader.result;                                                 // gets the raw data from the excel file
    workBook = XLSX.read(data, { type: 'binary' });

    const firstSheetName = workBook.SheetNames[0];                              // gets the first sheets name from the workbook
    this.workSheet = workBook.Sheets[firstSheetName];                           // gets the workSheet data from the sheet studentName

    this.parseExcelFile(cellIndex);
    this.fillClassRoster();
    this.cellIndexNumber = 1;
    }; // end of onload
  reader.readAsBinaryString(file);
  }// end of onFileChange
/*========================================================================================================
===================== INCREMENT CELL ROW  ================================================================
========================================================================================================*/
/* input: takes in the cellIndex
 * runtime: increments the tracker variable cellIndex number and places it behind the cellIndex letter
 * output: the new row incremented cellIndex
*/
incrementCellRow(cellIndex) {
  const cellIndexLetter = cellIndex.charAt(0);
  this.cellIndexNumber = this.cellIndexNumber + 1;
  cellIndex = cellIndexLetter + this.cellIndexNumber;
  return cellIndex;
  }// end of Increment Cell Row
/*========================================================================================================
===================== INCREMENT CELL COLUMN ==============================================================
========================================================================================================*/
/* input: takes in the cellIndex
 * runtime: increments the aphabetic character in the first position of the index
 * output: the new column incremented cellIndex
*/
incrementCellColumn(cellIndex) {
  return cellIndex = (String.fromCharCode(cellIndex.charCodeAt(0) + 1) + this.cellIndexNumber);
  }// end of Increment cell column
/*========================================================================================================
===================================== DECREMENT CELL COLUMN ==============================================
========================================================================================================*/
/* input: takes in the cellIndex
 * runtime: decrements the aphabetic character in the first position of the index
 * output: the new column decremented cellIndex
*/
decrementCellColumn(cellIndex) {
  return cellIndex = (String.fromCharCode(cellIndex.charCodeAt(0) - 1) + this.cellIndexNumber);
} // end of decrement cell column
/*========================================================================================================
===================== FILL CLASS ROSTER ==================================================================
========================================================================================================*/
/* input: takes in the array of names, emails, and groups
 * runtime: places the names, emails, and groups of the students into a student class
 * output: the student class
*/
fillClassRoster() {
  for (const i in this.emailArr) {
    if (this.nameArr[i]) {
      this.students.push( {
        name: this.nameArr[i],
        email: this.emailArr[i],
        group: this.groupArr[i],
        type: 'standard'}
    );
    } else {
      this.students.push({
        name: 'Student',
        email: this.emailArr[i],
        group: this.groupArr[i],
        type: 'standard'}
    );
    }
  }
  }// end of fill class roster
/*========================================================================================================
===================== GET INPUT ==========================================================================
========================================================================================================*/
/* input: takes in the input value from the roster name input field in the html
 * runtime: updates the roster name input from the html
 * output: updated roster inputValue
*/
onKey(value: string) {
  this.inputValue = value;                                                      // keeps the input value of class name updated
  }
/*========================================================================================================
==================== ON SUBMIT ===========================================================================
========================================================================================================*/
/* input: the list of selected options in the mat list from the html file
 * runtime: gets the names, emails, and groups from the selected values and places them in to a rosters structure
 * output: submits all of the users into the data base, creates a Class roster and places it in an array
*/
onSubmit(options: MatListOption[]) {
  this.students = [];

// sets the students array based off of the selected values in the list
  for (const i in options.map(o => o.value)) {
    if (i) {
      this.students.push({
       name:  options.map(o => o.value.name)[i],
       email: options.map(o => o.value.email)[i],
       group: options.map(o => o.value.group)[i],
       type: 'standard'
     });
  }}

  const roster = ClassRoster.fromJson({
    className: this.inputValue,
    students: this.students,
  });
                                                                                /* NOTE: options.map(o => o.value)
                                                                                gets the value from the selected options
                                                                             of the mat selection list                  */
  this.rosters.push(roster);

  console.log(roster);
  this.emailService.sendRoster(roster).subscribe(
  (str: string) => {
    if (str === 'error') {
      console.log('email failed to send');
    }
  });


  this.students = [];                                                           // resets array of students and class form
  this.classForm.reset();
  }// end of on submit
/*========================================================================================================
==================== SELECT ALL ==========================================================================
========================================================================================================*/
/* input:
 * runtime: selects all of the options in the mat selection list in the html
 * output:
*/
selectAll() {
  this.studentList.selectAll();                                                 // sets all options in the mat selection list to selected
}// end of select all
/*========================================================================================================
==================== POST CLASS ROSTER ===================================================================

/*========================================================================================================
==================================== PARSE EXCEL FILE ====================================================
========================================================================================================*/
/* input: cellIndex string and the excel workSheet
 * runtime: starting from the email column the function increments and decrements to get the firstname, lastname and group name
 * output: emailArr, nameArr, and groupArr
*/
parseExcelFile(cellIndex) {
  let blankSpaceEncountered = false;
  let name;
  let cell;
  let cellData;
  cellIndex = this.locateEmailColumn(cellIndex);
  while (!blankSpaceEncountered) {

    if (this.workSheet[cellIndex] === undefined) {
      blankSpaceEncountered = true;
      } else {

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      this.emailArr.push(cellData);                                             // gets the email from the cell

      cellIndex = this.decrementCellColumn(cellIndex);
      cellIndex = this.decrementCellColumn(cellIndex);                          // decrements to the first name column

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      name = cellData;                                                          // name contains first name

      cellIndex = this.incrementCellColumn(cellIndex);                          // decrements to the last name column

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      name = name + ' ' + cellData;
      this.nameArr.push(name);

      for (let i = 0; i < 5; i++) {                                             // moves to the column containing the groups
      cellIndex = this.incrementCellColumn(cellIndex);
      }

      cell = this.workSheet[cellIndex];
      cellData = (cell ? cell.v : undefined);
      this.groupArr.push(cellData);

      for (let i = 0; i < 4; i++) {                                             // resets the column position back to email column
      cellIndex  = this.decrementCellColumn(cellIndex);
      }
      cellIndex = this.incrementCellRow(cellIndex);                             // moves to the next row
      }// end of else
    }// end of while(!blankSpaceEncountered)
  }// end of parse Excel file
/*========================================================================================================
================================= LOCATE EMAIL COLUMN ====================================================
========================================================================================================*/
/* input: the excel work sheet and the cellIndex
 * runtime: increments the column of the cell index and uses a regex to find the column containing emails
 * output: the cell index of the first row of the column containing emails
*/
locateEmailColumn(cellIndex) {
  let emailFound = false;
  let cell;
  let cellData;
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // regular expression for emails
  while (!emailFound) {
    cell = this.workSheet[cellIndex];
    cellData = (cell ? cell.v : undefined);
    if (regexp.test(cellData) ) {                                               // checks to see if the data in the cell is an email
      emailFound = true;
    } else {
      cellIndex = this.incrementCellColumn(cellIndex);
      }
    }// end of while
  return cellIndex;
  } // end of Locate email column
// =======================================================================================================
}// end of class
