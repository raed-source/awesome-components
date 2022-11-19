import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
loading=false;
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
  showEmailError$!:Observable<boolean>;
  showPasswordError$!:Observable<boolean>;

  // ***************************************
constructor(private formBuilder: FormBuilder,
  private complexFormService:ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }
// ***************************************
private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
        startWith(this.contactPreferenceCtrl.value),
        map(preference => preference === 'email'),
        tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
        startWith(this.contactPreferenceCtrl.value),
        map(preference => preference === 'phone'),
        tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );
    this.showEmailError$=this.emailForm.statusChanges.pipe(
      map(status=>status==='INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
    );
    this.showPasswordError$=this.loginInfoForm.statusChanges.pipe(
      map(status=>status==='INVALID' 
      && this.passwordCtrl.value 
      && this.confirmPasswordCtrl.value
      && this.loginInfoForm.hasError('confirmEqual'))
    )
}
// ***************************************
private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
        this.emailCtrl.addValidators([
            Validators.required,
            Validators.email,
            //valValidator() force à ajouter le mot valid dans le mail
        ]);
        this.confirmEmailCtrl.addValidators([
            Validators.required,
            Validators.email
            
        ]);
    } else {
        this.emailCtrl.clearValidators();
        this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
}


// ***************************************
private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
        this.phoneCtrl.addValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
        ]);
    } else {
        this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
}

// ***************************************
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
},{
  Validators:[confirmEqualValidator('email', 'confirm')],
  updateOn:'blur'
}
);
this.passwordCtrl=this.formBuilder.control('');
this.confirmPasswordCtrl=this.formBuilder.control('');

this.loginInfoForm=this.formBuilder.group({
 username:['',Validators.required],
password:this.passwordCtrl,
confirmPassword:this.confirmPasswordCtrl
},
{
  Validators:[
    confirmEqualValidator('password', 'confirmPassword')
  ],
  updateOn:'blur'
})
  }
// ***************************************
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
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
        tap(saved => {
            this.loading = false;
            if (saved) {
                this.resetForm();
              } else {
              console.error('Echec de l\'enregistrement');
          }
        })
    ).subscribe();
}
  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Ce champ est requis';
    }else if(ctrl.hasError('email')){
      return 'Merci d\'entrer une adresse mail valide';
    } else if(ctrl.hasError('minlength')){
return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    }else if(ctrl.hasError('maxlength')){
      return 'Ce numéro contient plus chiffres';
          }
          // else if(ctrl.hasError('validValidator')){
          //   return 'cette adresse ne contien pas le mot valid';
          //       }
    
    
    else {
      return 'Ce champ contient une erreur';
  }
}
private resetForm(){
  this.mainForm.reset();
  this.contactPreferenceCtrl.patchValue('email');
}

}
