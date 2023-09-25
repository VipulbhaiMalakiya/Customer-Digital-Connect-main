import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appWhitespaceValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: WhitespaceValidatorDirective,
    multi: true
  }]
})
export class WhitespaceValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  }
}
