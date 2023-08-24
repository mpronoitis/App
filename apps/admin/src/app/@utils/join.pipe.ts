import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  //join an array of strings with a separator and remove empty strings
  transform(input: Array<any>, sep = ','): string {
    return input.filter((x) => x).join(sep);
  }

  //example usage: {{ ['a', 'b', 'c'] | join: ' ' }} //a b c
}
