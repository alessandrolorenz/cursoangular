import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';
// as imagens que nao sao data uri, precisam ter o endereco da API, cloud, etc
// 
@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    
    private _url = '';

    @Input() description='';
    
    @Input() set url(url: string)  { //cria um set que cria como parametro uma string
        if(!url.startsWith('data')) { // toda url que é data uri inicia com data
            this._url = CLOUD + url;
        } else {
            this._url = url; 
        }
    }

    get url() {
        return this._url;
    }
}
//PhotoComponent.url = 123; pega o set 123 por exemplo (iso é javascript)