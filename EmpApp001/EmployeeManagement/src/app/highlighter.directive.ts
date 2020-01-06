import { Directive, ElementRef,Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
  @Input() default:string = 'transparent';
  @Input() highlightcolor:string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.default;
  @HostBinding('style.pointerEvents') PointerEvent:String = 'auto'

  constructor(private eleRef:ElementRef,private renderer:Renderer2) { }
  
  @HostListener('mouseenter') mouseover (eventData:Event){
    //this.renderer.setStyle(this.eleRef.nativeElement,'background-color','skyblue');
    this.backgroundColor=this.highlightcolor;
  }

  @HostListener('mouseleave') mouseleave (eventData:Event){
    this.renderer.setStyle(this.eleRef.nativeElement,'background-color','transparent');
    this.backgroundColor=this.default;
  }

}
