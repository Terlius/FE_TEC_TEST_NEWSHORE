import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const value = inputElement.value;

    // Limpia el valor para que solo contenga números
    inputElement.value = value.replace(/[^0-9]/g, '');
  }

}
