import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NumberToMinutes' })
export class NumberToMinutes implements PipeTransform {
  transform(value: number): string {
    debugger;
    if (!value || isNaN(+value))
      //ensure value is not whitespace string or fail it
      return '';

    var hours = Math.floor(value / 60);
    var minutes = value % 60;
    if (hours > 0) {
      if (minutes > 0) return hours + 'h ' + minutes + ' min ';
      else return hours + 'h ';
    } else {
      return minutes + ' min ';
    }
  }
}
