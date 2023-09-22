import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseFloat'
})
export class ParseFloatPipe implements PipeTransform {
  transform(value: string): number {
    return parseFloat(value);
  }
}
