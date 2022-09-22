// Faith Hough
// This file contains different classes that are used to define variables throughout the project.
// User defines the student Array in ClassRoster. It contains all essential data that has been gathered from the User table in the database
export class User {
  email: string;
  name: string;
  group: string;
  type: string;
  static fromJson(obj): User {
    const rv: User = new User();
    rv.email = obj.email;
    rv.name = obj.name;
    rv.group = obj.group;
    rv.type = obj.type;
    return rv;
  }
}

// ClassRoster is used in email.service when a class is saved to the database
export class ClassRoster {
  className: string;
  students: User[];
  static fromJson(obj): ClassRoster {
    const rv: ClassRoster = new ClassRoster();
    rv.className = obj.className;
    rv.students = obj.students;
    return rv;
  }
}

// CaughtError is used to display error messages throughout the project
export class CaughtError {
  message: string;
  static fromJson(obj): CaughtError {
    const err: CaughtError = new CaughtError();
    err.message = obj.message;
    return err;
  }
}

// Survey contains all essential information that a survey must hold from the database
export class Survey {
      surveyID: string;
      classID: string;
      name: string;
      questions: Question[];
    static fromJson(obj): Survey {
      const survey: Survey = new Survey();
      survey.surveyID = obj.surveyID;
      survey.classID = obj.classID;
      survey.name = obj.name;
      survey.questions = obj.questions;
      return survey;
    }
  }

// Results is used to display all results for a student is survey-results.component once it is loaded from the php code. it holds all questions for a student, and all results for that
// question is a Result array
export class Results {
	question_text: string;
	studentResults: Result[];
     static fromJson(obj): Results {
     	const results: Results = new Results();
     	results.question_text = obj.question_text;
     	results.studentResults = obj.studentResults;
     	return results;
     	}
  }

// Result formats all results for one question in the Results Class
export class Result {
	answer:string;
      static fromJson(obj): Result {
	const result: Result = new Result();
	result.answer = obj.nswer;
   	return result;
   	}
  }

// Question is used to hold all information about questions in the database to be used when creating or loading a survey
export class Question {
   question: string;
   questionID: string;
   type: string;
   answers: Answer[];
   static fromJson(obj): Question {
     const question: Question = new Question();
     question.question = obj.question;
     question.questionID = obj.questionID;
     question.type = obj.type;
     question.answers = obj.answers;
     return question;
   }
}

// Answer holds all necessary information about answers that must be stored when gathering from or loading to the database. It is used in class Question because there will
// usually be more than one answer for one question
export class Answer {
   answer: string;
   answerID: string;
   static fromJson(obj): Answer {
     const answer: Answer = new Answer();
     answer.answer = obj.answer;
     answer.answerID = obj.answer;
     return answer;
   }
}
