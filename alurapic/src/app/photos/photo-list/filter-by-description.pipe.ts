import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../photo/photo';

@Pipe({ name: 'filterByDescription'})


    // todo pipe tem que ser declarado no modulo a qual pertence (photolistmodule)

export class FilterByDescription implements PipeTransform {
        
    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();
            //vai receber a descricao e mudar pra caixa baixa entao: testa
        if(descriptionQuery) {
            // se tem filtra senao retorna o photos
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return photos;
        }
    }

}