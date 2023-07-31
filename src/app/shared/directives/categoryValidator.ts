import { FormControl, FormGroup, Validators } from '@angular/forms';

function categoryValidator(control: FormControl): { [key: string]: boolean } | null {
  const value = control.value;

  if (value && (value.trim() === '' || /^[A-Z][a-z]*$/.test(value))) {
    return { 'invalidCategory': true };
  }

  return null;
}
