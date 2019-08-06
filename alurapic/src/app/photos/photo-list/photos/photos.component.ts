import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'] // estilo criado do scrow
})
// foi trocado o onitit por onchanges para atualizar o array photos: Photo[] = [];
export class PhotosComponent implements OnChanges {
  
  @Input() photos: Photo[] = [];
  rows: any[] = [];
  
  constructor() { } 

  ngOnChanges(changes: SimpleChanges) {
    if(changes.photos)   // pergunta : mudou a propriedade photos?
      this.rows = this.groupColumns(this.photos); // vai fazer o group usando afuncao a baixo
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }                            
    return newRows;
  }
}

