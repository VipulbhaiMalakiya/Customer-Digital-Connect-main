import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenFileName'
})
export class ShortenFileNamePipe implements PipeTransform {
  transform(value: string, maxLength: number = 20): string {
    if (value.length <= maxLength) {
      return value;
    }

    const fileNameWithoutExtension = value.split('.').slice(0, -1).join('.');
    const extension:any = value.split('.').pop();
    const truncatedName = fileNameWithoutExtension.substring(0, maxLength - extension.length);

    return `${truncatedName}...${extension}`;
  }
}
