import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @Input() appHover: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element);
  }


   ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(
      this.element.nativeElement, 'backgroundColor', this.appHover
    );
  } 
}
