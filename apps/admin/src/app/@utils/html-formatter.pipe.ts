/**
 * @summary Pipe to format a piece of HTML code
 * @returns {string} The formatted code
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlFormatter',
})
export class HtmlFormatterPipe implements PipeTransform {
  transform(input: string, indentation: string = '  '): string {
    //remove all newlines
    input = input.replace(/[\r\n]+/g, '');
    //remove all spaces before and after the tags
    input = input.replace(/>\s+</g, '><');
    //add a newline before each tag
    input = input.replace(/></g, '>\r\n<');
    //add a newline after each tag
    input = input.replace(/>\r\n</g, '>\r\n<');

    //add indentation
    const lines = input.split('\r\n');
    let indent = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('</')) {
        indent--;
      }
      lines[i] = indentation.repeat(indent) + line;
      if (line.endsWith('/>') || line.startsWith('<!')) {
        //do nothing
      } else if (line.startsWith('<')) {
        indent++;
      }
    }
    return lines.join('\r\n');
  }
}
