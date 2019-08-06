import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './singup/singup.component';
import { LoginGuard } from '../core/auth/login.guard';

// Este modulo de rotas é usado para fazer o split do codigo e lazy load
const routes: Routes = [
    { // para acessar essas rotas precisa acessar a rota raiz
        path: '', // se a primeira rota for home, esta é a rais e
                        // depois carrega para*
        component: HomeComponent,
        canActivate: [LoginGuard], // usado para nao deixar acessar a pagina no caso de ja loggado
        children: [
            { // rotas filhas
                path: '', // * carrega para cá
                component: SignInComponent,
            }, 
            { 
                path: 'signup',
                component: SignUpComponent,
            },            
        ]
    },              
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes) // pra montar esse arquivo de rotas é a partir da rota pai
                                        // o unico que usa for root é o app-routing module
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }

