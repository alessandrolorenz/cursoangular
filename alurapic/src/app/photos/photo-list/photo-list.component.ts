import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})

// Este componente foi criado pelo terminal
export class PhotoListComponent implements OnInit {

  // o array vinha vazio mas com o RESOLVE ele carrega e recebe ja preenchido
  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true; // tem para o botao load more (loadbutton)
  // inicia true probotao estar aparecendo na tela
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
                        // o segundo userName q é atribuido é
                            // um parametro do approutingmodule :username - do modulo de rotas
                            //o activated manda pra lá entao
      this.activatedRoute.params.subscribe(params => { // subscribe - entao fica ouvindo a mudanca da rota pra recarregar as rotas no navegador
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data['photos']; //nao é params é data 
    });
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = ''; // recebe a string em branco para o botao loadmore funcionar
        this.photos = this.photos.concat(photos); // concat pega a lista e gera uma nova lista
        if(!photos.length) this.hasMore = false;
      });
  }
}
