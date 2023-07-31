import { AbstractControl, ValidatorFn } from '@angular/forms';

export function imageExtensionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value as File;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (file) {
      const fileName = file.name.toLowerCase();
      const fileExtension:any = fileName.split('.').pop();

      if (allowedExtensions.indexOf(fileExtension) === -1) {
        return { invalidImageExtension: true };
      }
    }

    return null;
  };
}
