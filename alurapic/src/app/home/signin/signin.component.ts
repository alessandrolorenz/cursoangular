import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    // nao tem selector pois tem scopo de pagina
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    loginForm: FormGroup; 
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
    //variavel de template - procure o elemento#userNameInput e coloque neste elemento aqui
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({ // devolde um formgoup
            userName: ['', Validators.required], // validacao tb
            password: ['', Validators.required]
        });
        this.platformDetectorService.isPlatformBrowser() && 
        this.userNameInput.nativeElement.focus();        
    } 

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && // se está no browser é true, se falso ele nao segue para a outra instrução (auto focus) e protege de ir pro serve e manipular o DOM
                        this.userNameInput.nativeElement.focus(); // aqui tem que acessar o elemento nativo direto do DOM
                    alert('Invalid user name or password');
                }
            );
    }
}