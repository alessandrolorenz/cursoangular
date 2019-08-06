import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const API = environment.ApiUrl; // a string da api foi colocada no environment(build de desenv e producao)

@Injectable({ providedIn: 'root' })
export class PhotoService {
    // o constructor é pra injeção de dependencia
    // o httpclient tem que estar importado no modulo para estar disponivol auto complete
    constructor(private http: HttpClient) {}
                // private para prop da classe (this. para ficar disponibilizado)
    listFromUser(userName: string) {
        return this.http
                                    // este username é parametro da rota parametrizada
                                    // e depois acessa com ActivatedRoute
            .get<Photo[]>(API + '/' + userName + '/photos');       
    }

    listFromUserPaginated(userName: string, page: number) {
        // o back esta conf de 12 em 12 paginas caminho flavio/fotos/1,2,3 (paginas)
        // cria um params=page que recebe o numero
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });       
    } 
    
    upload(description: string, allowComments: boolean, file: File) {
        
        const formData = new FormData();// form data padrao nao é o do angular por isso da inicializacao
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false'); // precisa ser string
        formData.append('imageFile', file); // imageFile definido no backend

        return this.http.post(API + '/photos/upload', formData);

    }

    findById(photoId: number) {

        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(
                API + '/photos/' + photoId + '/comments'
        );
    }

    addComment(photoId: number, commentText: string) {

        return this.http.post(
            API + '/photos/' + photoId + '/comments',
            { commentText }
        );        
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {

        return this.http.post(
            API + '/photos/' + photoId + '/like', {}, { observe: 'response'} // boolean
        )
        .pipe(map(res => true))
        .pipe(catchError(err => { // se der erro
            return err.status == '304' ? of(false) : throwError(err); // se houver 304=observable false
            // of() do rxjs retorna um observable // se !304 entao throw
        }));
    }
}
