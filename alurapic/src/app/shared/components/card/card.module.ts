import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
// cria um modulo pois o componente nao pode ser declarado em mais de um modulo
// declara aqui e importa nos outros modulos que precisarem dele

@NgModule({
    declarations: [CardComponent],
    exports: [CardComponent],
    imports: [CommonModule]
})
export class CardModule { }