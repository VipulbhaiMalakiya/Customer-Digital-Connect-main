import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipePipe implements PipeTransform {

  transform(value: any): any {
    const date = moment(value);
    const now = moment();

    // Calculate the difference between the given date and the current date
    const daysDiff = now.diff(date, 'days');

    if (daysDiff === 0) {
      // Today
      return `${date.format('h:mm A')}`;
      // return `Today, ${date.format('h:mm A')}`;
    } else if (daysDiff === 1) {
      // Yesterday
      return `Yesterday`;
    } else if (daysDiff < 7) {
      // Within the last week
      return `${date.format('dddd')}`;
    } else {
      // Older than a week
      return date.format('D/M/YY');
    }
  }
}
