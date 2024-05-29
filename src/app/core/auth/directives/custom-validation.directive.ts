import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustomValidation]',
  standalone: true
})
export class CustomValidationDirective implements Validator {
  @Input('appCustomValidation') customError!:string
  isValid=false
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const data=control.value
     if(data.length>5){
      this.isValid=true
     }
    return this.isValid?{error:this.customError}:null
    // throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
