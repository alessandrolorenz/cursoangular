import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ] // saiu do injectable "root" do servico e veio pra ca
})
export class SignUpComponent implements OnInit {
    
    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>; // pra poder usar o platform detector e autofocus
    // #emailInput no template
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [
                    Validators.required,
                    lowerCaseValidator, // este validador foi criado por nós, mas usa-se com o nome especificado dentro dele: lowerCase(no return)
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken() // o terceiro é o validador assincrono
            ],
            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });

        this.platformDetectorService.isPlatformBrowser() && // testa se é browser
            this.emailInput.nativeElement.focus();    // auto focus
    } 

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser; // da o objeto javascript com os dados 
        this.signUpService
            .signup(newUser) // faz o signup com o newuser no servico
            .subscribe( // se der certo o router encaminha para a rota
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }
}