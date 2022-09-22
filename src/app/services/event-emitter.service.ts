import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Question } from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSaveSurveyFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onSurveySaveButtonClick(questionArr: Question[]) {
    this.invokeSaveSurveyFunction.emit(questionArr);
  }
}
