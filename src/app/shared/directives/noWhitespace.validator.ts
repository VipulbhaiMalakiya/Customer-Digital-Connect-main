import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noBlankSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && (value.trim() !== value)) {
      return { noBlankSpaces: true };
    }

    return null;
  };
}
