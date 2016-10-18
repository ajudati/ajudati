import { Directive, Input, Renderer, ElementRef } from '@angular/core';
@Directive({
  selector: "[focus]"
})
export class FocusDirective {
  @Input()
  focus:boolean;
  constructor(private renderer:Renderer, private el: ElementRef) {}
  protected ngOnChanges() {
    console.log(this.focus);
    if(this.focus) this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
  }
}