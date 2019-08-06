import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(userName: string, password: string) {

    return this.http
      .post(
        API_URL + '/user/login', 
        { userName, password }, 
        { observe: 'response'} // terceiro parametro para o pipe (e depois subscrever nele)
                              // que é a resposta
      )
      .pipe(tap(res => { // tap= entre a execussao e o subscribe ele filtro, ou outra operacao 
        const authToken = res.headers.get('x-access-token'); // o headers é passado como um terceiro parametro  em authservice
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }
}