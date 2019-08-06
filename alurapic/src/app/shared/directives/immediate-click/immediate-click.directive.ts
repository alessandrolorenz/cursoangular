import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatformDetectorService } from "../../../core/plataform-detector/platform-detector.service";

@Directive({
    selector: '[immediateClick]' //de atributo entre[]
})
export class ImmediateClickDirective implements OnInit { 

    constructor(
        private element: ElementRef<any>,
        private platFormDetector: PlatformDetectorService) {}
        
        ngOnInit(): void { // onInit na diretiva pra nao ser carregado depois da injecao da dependencia no constructor
            this.platFormDetector.isPlatformBrowser && 
            this.element.nativeElement.click(); // tem que fazer isso mas protegido pra nao acessar o DOM diteramente
        }

}