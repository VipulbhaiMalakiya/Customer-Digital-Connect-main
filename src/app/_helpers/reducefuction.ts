// Create a file named 'reduce.pipe.ts'
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduce'
})
export class ReducePipe implements PipeTransform {
  transform(items: any[], prop: string): any {
    if (!Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => total + item[prop], 0);
  }
}
