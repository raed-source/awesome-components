import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  mainForm!: FormGroup;
  personalInfoForm!:FormGroup;
  contactPreferenceCtrl!:FormControl;
  phoneCtrl!:FormControl;
  emailCtrl!:FormControl;
  confirmEmailCtrl!:FormControl;
  emailForm!:FormGroup;
  passwordCtrl!:FormControl;
  confirmPasswordCtrl!:FormControl;
  loginInfoForm!:FormGroup;
  showEmailCtrl$!:Observable<boolean>;
  showPhoneCtrl$!:Observable<boolean>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }
  private initFormObservables() {
    this.showEmailCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preferenc=>preferenc==='email')
    );
    this.showPhoneCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference=>preference==='phone'),
      tap(showPhoneCtrl=>{
        if(showPhoneCtrl){
this.phoneCtrl.addValidators([Validators.required,Validators.minLength(10),Validators.maxLength(10)])
        }else{
this.phoneCtrl.clearValidators();
        }
        this.phoneCtrl.updateValueAndValidity();
      })
    )
  }
  private initFormControls() {
this.personalInfoForm=this.formBuilder.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required]
});
this.contactPreferenceCtrl=this.formBuilder.control('email');
this.phoneCtrl=this.formBuilder.control('');
this.emailCtrl=this.formBuilder.control('');
this.confirmEmailCtrl=this.formBuilder.control('');
this.emailForm=this.formBuilder.group({
  email:this.emailCtrl,
  confirm:this.confirmEmailCtrl
});
this.passwordCtrl=this.formBuilder.control('');
this.confirmPasswordCtrl=this.formBuilder.control('');
this.loginInfoForm=this.formBuilder.group({
 username:['',Validators.required],
password:this.passwordCtrl,
confirmPassword:this.confirmPasswordCtrl
})
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo:this.personalInfoForm,
      contactPreference:this.contactPreferenceCtrl,
      email:this.emailForm,
      phone:this.phoneCtrl,
      login:this.loginInfoForm
    });
  }
  onSubmitForm() {
console.log(this.mainForm.value)
  }
}
