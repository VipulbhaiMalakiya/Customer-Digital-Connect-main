import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'h:mm a');
  }
}
