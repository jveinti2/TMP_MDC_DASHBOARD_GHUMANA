import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[numberValidate]'
})
export class OnlyInputNumber {

  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  @Input('withPoints') withPoints: boolean = true;

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if(this.specialKeys.indexOf(event.key) !== -1) return;
    let current: string = this.elementRef.nativeElement.value;
    let next: string = current.concat(event.key);
    if(next && !String(next).match(this.regex)) event.preventDefault();
  }
  @HostListener('blur', ['$event']) onBlur(event: KeyboardEvent) {
    if(this.withPoints) this.elementRef.nativeElement.value = new Intl.NumberFormat('es-CO').format(this.elementRef.nativeElement.value);
  }
  @HostListener('focus', ['$event']) onFocus(event: KeyboardEvent) {
    this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/\./g, '').replace(/$/g, '').replace(/,/g, '.');
  }
}
