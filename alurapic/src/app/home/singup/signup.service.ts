import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { provideForRootGuard } from '@angular/router/src/router_module';
import { environment } from 'src/environments/environment';

// validacoes assincronas
const API_URL = environment.ApiUrl;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {}

    checkUserNameTaken(userName: string) {

        return this.http.get(API_URL + '/user/exists/' + userName);
    } // validador nao suporta injecao de dependencia entao precisamos de uma estrategia - criar um servico: user-not-taken.validator.service

    signup(newUser: NewUser) {
        return this.http.post(API_URL + '/user/signup', newUser); //
    }
}