import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home',
        loadChildren: './home/home.module#HomeModule' // modulo sem .ts + o nome da classe - carregar sobre demanda (lazy load)
    },              
    { 
        path: 'user/:userName', // será visto usando ActivatedRoute (photo-list)
        pathMatch: 'full',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard] // como pode ter mais de uma rota fica num array
    }, // ao por o authguard ou mexer nas rotas o angular pode se perder - entao reiniciar
    { 
        path: 'p/:photoId', // parametrizada com o :nome (: é o coringa)
        component: PhotoDetailsComponent,
    }, 
    { 
        path: 'not-found', 
        component: NotFoundComponent 
    },     
    { // tem seu proprio modulo (errors)
        path: '**', 
        redirectTo: 'not-found'
    }  
];

@NgModule({ 
    imports: [ 
        // RouretModule tem que ter uma relacao com o routes
        // (Router... forroot, Leve em consideracao routes )
        // reabrir o angular no terminal 
        RouterModule.forRoot(routes, { useHash: true } ) // useHash evita que mande tudo para o servidor e evita problemas e configuracoes
    ],
    exports: [ RouterModule ] // quem importar approutermodule leva este junto
})
export class AppRoutingModule { }
// o componente do Routermodule é <app-outlet></app-outlet> que está no index

