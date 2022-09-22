# PMAP2020

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.
This directory contains all components, services, modules that are used for the front-end side of PMAP.

## components

[add-administrator](components/add-administrator)
The admin user is able to add a new administrator by submitting their email address.

[change-pass](components/change-pass)
The user that is currently logged in can change their password after correctly inputting their old password.

[create-survey](components/create-survey)
The admin user can create a survey and assign it to a certain class or group.

[excel-parser](components/excel-parser)
The admin user can add a new class of students by copying their roster into an .xml file and uploading it.

[home](components/home)
This component will host the toolbar and sidebar for the admin user.

[login](components/login)
This component will be the first to appear when running the program. The user must sign in as a standard or admin before doing anything else.

[my-surveys](components/my-surveys)
The admin user will be able to view all surveys they have created.

[student-home](components/student-home)
The standard user will have the toolbar.

[student-survey-page](components/student-survey-page)
The standard user will see their surveys from this component.

[survey](components/survey)
The standard user will take surveys from this component.

[survey-results](components/survey-results)
The admin user will view all survey results from this component.

## services

[email](services/email.service.ts)
The email service will host all addition to the Users table.

[login](services/login.service.ts)
The login service validates users and allows them to alter the User table.

[resultsservice](services/resultsservice.service.ts)
The results service will allow the admin user to interact with the backend to gather the data they need.

[surveys](services/surveys.service.ts)
The survey service sends and retrives surveys to the database when they are created, deleted, or loaded.

[common.types](common.types.ts)
common.types holds all classes that are used to describe variables.
