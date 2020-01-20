import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   patternValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = pattern.test(control.value);
      return forbidden ? null:{'pattern': {value: control.value}};
    };
  }

  confirmValidator(controlName:string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if((control.parent||null)==null) return null;

      const forbidden = control.parent.controls[controlName].value==control.value;
      return forbidden ? null:{'confirm': {value: control.value}};
    };
  }
 
  constructor() { }
}


