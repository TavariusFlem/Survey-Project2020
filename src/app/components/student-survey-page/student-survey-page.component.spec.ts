import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSurveyPageComponent } from './student-survey-page.component';

describe('StudentSurveyPageComponent', () => {
  let component: StudentSurveyPageComponent;
  let fixture: ComponentFixture<StudentSurveyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSurveyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
