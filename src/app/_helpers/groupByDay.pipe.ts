import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByDay'
})
export class GroupByDayPipe implements PipeTransform {
  transform(messages: any[]): any {
    if (!messages || !messages.length) {
      return [];
    }

    const groupedMessages = [];
    let currentDay = null;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const messageDay = new Date(message.timestamp).toLocaleDateString();

      if (messageDay !== currentDay) {
        currentDay = messageDay;
        groupedMessages.push({ day: currentDay, messages: [message] });
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(message);
      }
    }

    return groupedMessages;
  }
}
