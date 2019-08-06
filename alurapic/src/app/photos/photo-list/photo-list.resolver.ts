import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Injectable({ providedIn: 'root'})
// o resolve é generico por isso tipa ele como <array de photo>
// ELE É USADO PARA CARREGAR O ARRAY DE FOTOS E MANDAR PRO COMPONENTE
// tem que declarar ele na rota depois
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{

    constructor(private service: PhotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        // recebe da rota o parametro username
        const userName = route.params.userName;
        return this.service.listFromUserPaginated(userName, 1);
    }
}