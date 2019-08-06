import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, first } from 'rxjs/operators';

import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { AlertService } from "../../shared/components/alert/alert.service";
import { UserService } from "../../core/user/user.service";
// 
@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit { 

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    ngOnInit(): void { // pega a foto e exibe mas a exibicao e e adocao de comentarios ficou para o photocommentsComponent
        this.photoId = this.route.snapshot.params.photoId; //photoId tem que ser o mesmo nome do :photoId(prop com : na rota)
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(() => {}, err => { // ()=> {} significa se houver callback de sucesso...  
            console.log(err); // mas se der erro...
            this.router.navigate(['not-found']);
        });
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId) 
            .subscribe( // se remover com sucesso
                () => {
                    this.alertService.success("Photo removed", true);
                    this.router.navigate(['/user', this.userService.getUserName()]);// antes estava [''] entao redirecionava
                                        // e como estava loggado a segunda navegacao apagava a mensagem
                },
                err => {
                    console.log(err);
                    this.alertService.warning('Could not delete the photo!', true);
                });
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            });
    }
}