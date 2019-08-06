import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';
// sub modulo
@NgModule({
    declarations: [PhotoFormComponent],
    imports: [ 
        CommonModule,
        ReactiveFormsModule, // este que eu quero usar
        VMessageModule,
        FormsModule, // mas é bom importar para ter um provider de forms
        RouterModule,
        PhotoModule, // importado para ter acesso ao preview no template
        ImmediateClickModule
    ]
})
export class PhotoFormModule { }