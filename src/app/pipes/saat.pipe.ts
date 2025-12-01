import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saat',
  standalone: true
})
export class SaatPipe implements PipeTransform {
  transform(value: any): any {
    // First, get the part after the space
    function getSubstringAfterSpace(inputString: string): string {
      const spaceIndex = inputString.indexOf(' ');
      if (spaceIndex !== -1) {
        return inputString.substring(spaceIndex + 1);
      }
      return inputString; // If there is no space, return the entire string
    }

    // Get the time value
    let timeStr = getSubstringAfterSpace(value);
    
    // Separate hour and minute (take the first 5 characters: HH:MM)
    return timeStr.substring(0, 5);
  }
}