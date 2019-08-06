import { Injectable } from '@angular/core';

const KEY = 'authToken';


// para receber e manupular o token
// para descriptografar e usar tem que instalar pelo terminal o npm install jwt-decode@2.2.0. 
@Injectable({ providedIn: 'root'})
export class TokenService {

    hasToken() {
        return !!this.getToken(); // se é boolean se é false troca pra true e vice versa
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}