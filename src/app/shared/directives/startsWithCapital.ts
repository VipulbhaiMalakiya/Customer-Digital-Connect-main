import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capitalLetterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return { capitalLetter: true };
    }
    return null;
  };
}
