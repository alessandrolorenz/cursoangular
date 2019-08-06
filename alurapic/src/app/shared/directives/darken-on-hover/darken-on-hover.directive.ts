import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
// para usar a diretiva como um atributo diretamente no template o selector tem que estar entre []
export class DarkenOnHoverDirective { // deve ser importada em ph.comp que esta em
                            //  ph.list.mod onde eu quero usar ela

    @Input() brightness = '70%';
    // acessa a casca sobre o elemento DOM
    constructor(
        private el: ElementRef,
        private render: Renderer
    ) {}

    @HostListener('mouseover') //diretiva do elemento host
    darkenOn() {
        // render usado para nao manipular o DOM , pq la no servidor nao tem DOM
        // usa tres parametros, set onde, o que e qual valor
        //bightness tem que ter uma template string: `  ` (crase)
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}