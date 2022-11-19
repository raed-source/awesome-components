<<<<<<< HEAD
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validValidator():ValidatorFn{
return (ctrl:AbstractControl): null | ValidationErrors =>{
    if(ctrl.value.include('VALID')){
        return null;
    }else{
        return{
            validValidator:ctrl.value

        }
    }
}
}
=======
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validValidator(): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (ctrl.value.includes('VALID')) {
            return null;
        } else {
            return {
                validValidator: ctrl.value
            };
        }
    };
}
>>>>>>> ce816209bdf599dc7ae0ac4ec32c56108afb9e48
