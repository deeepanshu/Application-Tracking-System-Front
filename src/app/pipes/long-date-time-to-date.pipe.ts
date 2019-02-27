import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longDateTimeToDate'
})
export class LongDateTimeToDatePipe implements PipeTransform {

  transform(value: any): any {
    let date = new Date(value);

    return `${date.getDate()}-${date.getMonth().toString().padStart(2,'0').toString()}-${date.getFullYear()}`;
  }

}
