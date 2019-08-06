import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jtw_decode from 'jwt-decode';


// feito para armazenar o token com auxilio do tokeservice e disponipilizar o user
@Injectable({ providedIn: 'root'})
export class UserService { 

    private userSubject = new BehaviorSubject<User>(null); //foi usada a interface user que ta no playload
    // beheaviorsub ja emite o valor inicial nele no constructor. 
    // ele emite, se ninguem consumir ele guarda e disponibiliza
    private userName: string;

    constructor(private tokenService: TokenService) { 

        this.tokenService.hasToken() && // para que ao fechar e abrir o navegador ele continue la
            this.decodeAndNotify(); // se tiver token faz o decode
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as User; // pega o token decode e coloca como user
        this.userName = user.name;
        this.userSubject.next(user); // emite atraves do user Subject
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() { // usado pelo authguard
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}