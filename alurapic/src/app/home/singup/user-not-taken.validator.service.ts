import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from './signup.service';

import { debounceTime, switchMap, map, first, tap } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {} 

    checkUserNameTaken() {

        return (control: AbstractControl) => { // retorna null caso tenha validacao
            return control
                .valueChanges // ao inves de value usa este que retorna um observable
                .pipe(debounceTime(300)) // esperar
                .pipe(switchMap(userName => //este switchmap captura, e para nao mandar dois observable, ele troca o fluxo para este
                        this.signUpService.checkUserNameTaken(userName)
                )) // resul é true ou falso e precisa ser null o ele mesmo
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(tap(r => console.log(r)))
                .pipe(first()); // o primeiro valor completa o valor, sem ele fica esperando
        }
    }
}