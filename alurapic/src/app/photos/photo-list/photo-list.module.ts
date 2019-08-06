import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './filter-by-description.pipe';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from '../../shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from '../../shared/directives/darken-on-hover/darken-on-hover.module';
import { RouterModule } from '@angular/router';
// este é um submodulo importado em photosmodule
// photo, photoform, photolist cadaum tem seu modulo (sub)
@NgModule({
    declarations: [
        PhotoListComponent,
        PhotosComponent,
        LoadButtonComponent,
        FilterByDescription,
        SearchComponent 
    ],
    imports: [ 
        CommonModule, // este é sempre necessario para os *ngif / *ngfor
        PhotoModule, // este precisa ainda exportar o photocomponent pra ter acesso a ele
        CardModule, 
        DarkenOnHoverModule,
        RouterModule // para usar com a photos.component
    ]
    // eport é usado quando é necessario usar no template de outro
})
export class PhotoListModule {}