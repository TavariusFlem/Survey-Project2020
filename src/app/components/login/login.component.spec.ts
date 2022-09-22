import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = jasmine.createSpyObj('router', ['navigateByUrl']);
  const mockLoginService = jasmine.createSpyObj('loginService', ['login']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('doLogin', () => {
    it('should call loginService', () => {
      mockLoginService.login.calls.reset();
      component.ngOnInit();
      component.loginForm.controls['username'].setValue('jack');
      component.loginForm.controls['password'].setValue('jill');
      component.doLogin();
      expect(mockLoginService.login).toHaveBeenCalledWith('jack', 'jill');
    });
  });
});
