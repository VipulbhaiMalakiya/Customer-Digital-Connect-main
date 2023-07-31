import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipePipe implements PipeTransform {

  // transform(value: any, ...args: unknown[]): unknown {
  //   if (!value) { return 'a long time ago'; }
  //   let time = (Date.now() - Date.parse(value)) / 1000;
  //   if (time < 10) {
  //     return 'just now';
  //   } else if (time < 60) {
  //     return 'a moment ago';
  //   }
  //   const divider = [60, 60, 24, 30, 12];
  //   const string = [' second', ' minute', ' hour', ' day', ' month', ' year'];
  //   let i;
  //   for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
  //     time /= divider[i];
  //   }
  //   const plural = Math.floor(time) > 1 ? 's' : '';
  //   return Math.floor(time) + string[i] + plural + ' ago';
  // }

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
      return `${date.format('h:mm A')}`;
    } else if (daysDiff < 7) {
      // Within the last week
      return `${date.format('dddd')}`;
    } else {
      // Older than a week
      return date.format('D/M/YY');
    }
  }
}
