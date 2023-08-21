import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice'
})
export class TotalPricePipe implements PipeTransform {
  transform(items: any[]): number {
    if (!items) return 0;

    return items.reduce((total, item) => total + (item.quantity * item.item_price), 0);
  }
}
