import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToMessage'
})
export class BooleanToMessagePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return value ? 'Yes' : 'No';
  }

}
