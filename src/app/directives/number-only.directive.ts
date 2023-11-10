import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * Number only directive
 * don't allow any character except number
 * 
 */
@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {}
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }

}
