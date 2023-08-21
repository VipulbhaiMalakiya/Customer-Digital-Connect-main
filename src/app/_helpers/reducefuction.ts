import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice1'
})
export class totalPrice1 implements PipeTransform {
  transform(items: any[]): number {
    if (!items) return 0;

    return items.reduce((total, item) => total + (item.quantity), 0);
  }
}
