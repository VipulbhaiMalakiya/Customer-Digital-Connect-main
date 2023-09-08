import { ValidatorFn, AbstractControl } from "@angular/forms";

export function noLeadingSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.charAt(0) === ' ') {
      return { 'leadingSpace': true };
    }
    return null;
  };
}
