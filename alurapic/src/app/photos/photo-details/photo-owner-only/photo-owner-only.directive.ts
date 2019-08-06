import { Directive, Renderer, OnInit } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit { 

    @Input() ownedPhoto: Photo;
    
    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService // 
            .getUser()
            .subscribe(user => {
                if(!user || user.id != this.ownedPhoto.userId) { // user é nulo ou o id é dif do id da photo? se for nao aparece
                    this.renderer.setElementStyle(
                        this.element.nativeElement, 'display', 'none'
                    );
                }
            });
    }
}