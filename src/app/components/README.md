# Component-level readme
###### Author: Tavarius Fleming
------------------
### Contents
* Admin Page Components

.* Admin Home (Home)

.* Login

.* Change Pass

.* Create Survey

.* Excel Parser

.* Survey Results

------------------
* Student Page Components

.* Student Home

.* Survey

.* Student Survey Page

------------------
* Admin Home
-----
This is the component that holds all of the subsequent Admin pages. Admin Home utilizes a
Mat-ToolBar that wraps around the content of the admin pages
----

* Login
----
This is the login component that utilizes a FormGroup to validate the emails input and if
there is a password.

This compoent also calls on the login service to call on a php script to validate if you are
current user or not. If your account is an administration account then it directs the user to
the administration page and if the account is a student account then it directs to the student page
----

* Change Pass
---
This component utilizes a FormGroup to validate if the new passwords match and also if the
old password matches the one on record. Once those are passed the login component calls on
the php script to change the password in the data base
---

* Create Survey
----
The create survey component uses a FormGroup to add in additional questions based on the
admins selection. once saved it sends all of the recipients of the survey an email using the email service
and adds the survey data into the database using the survey service
----

* Excel Parser
----
The excel parser component utilizes the XLSX library to parse through an excel file given by
administrators which retrieve the excel file from blackboard and modifying its contents to include
the students current group
----

* Survey Results
----
This component is a work in progress but it would display the survey data written about each of the
students.
----

* Student Home
----
The student home component is the equivalent of the admin homepage in functionality
but does not have the side toolbar only the top toolbar.

The student home component is displayed when the logged in users account is of the student type
----

* Survey
----
 The survey component is a component that displays the currently accessed survey
 and once finished will call upon the survey service to input the data in the database
----

* Student Survey Page
----
 The student survey page component serves as a list page that shows the available
 surveys that the student can click on and access and take the survey
----
