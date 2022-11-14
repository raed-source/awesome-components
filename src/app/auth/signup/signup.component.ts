import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!:FormGroup;
  emailForm!:FormGroup;
  passwordCtrl!:FormControl;
  emailCtrl!:FormControl;
  errorMsg: any;
  showEmailCtrl$!:Observable<boolean>;
  showPhoneCtrl$!:Observable<boolean>;



  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initFormControls();
    this.initMainForm();
  }
  initMainForm() {

  }
  initFormControls() {
    this.mainForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });

  }

  onSignup() {
    this.loading = true;
    const firstName=this.mainForm.get('firstName')!.value;
    const lastName=this.mainForm.get('lastName')!.value;
    const email = this.mainForm.get('email')!.value;
    const password = this.mainForm.get('password')!.value;
    this.auth.createUser(firstName,lastName,email, password).pipe(
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {
        this.loading = false;
        this.router.navigate(['/posts']);
      }),
      catchError(error => {
        this.loading = false;
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }

}
