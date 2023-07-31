import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export function noEmptySpaces(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value && (value.trim() !== value)) {
    return { 'noEmptySpaces': true };
  }
  return null;
}
