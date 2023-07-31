import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'whatsAppDateFilter'
})
export class WhatsAppDateFilterPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(messages: any[]): any[] {
    let filteredMessages: any[] = [];
    let currentDate;

    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      const currentMessageDate = new Date(currentMessage.timestamp);

      const formattedCurrentDate = this.datePipe.transform(currentMessageDate, 'mediumDate');

      if (formattedCurrentDate !== currentDate) {
        const dateSeparatorMessage = {
          timestamp: currentMessage.timestamp,
          content: formattedCurrentDate,
          isDateSeparator: true
        };
        filteredMessages.push(dateSeparatorMessage);
        currentDate = formattedCurrentDate;
      }

      filteredMessages.push(currentMessage);
    }

    return filteredMessages;
  }
}
