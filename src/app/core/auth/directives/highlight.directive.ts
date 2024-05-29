import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private element:ElementRef) { }
  @HostListener('mouseenter') onMouseEnter(){
    this.highlight('red')
  }
  @HostListener('mousehover') onMouseHover(){
    this.highlight('yellow')
  }
  highlight(color:string){
    this.element.nativeElement.style.color=color
  }
}
