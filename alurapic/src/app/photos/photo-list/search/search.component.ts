import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    @Output() onTyping = new EventEmitter<string>(); // este on typing vem de ph.list.comp - 
    @Input() value: string = ''; // limpra o input qnd loadmore for pressionado
    //o subject permite no next emite um valor (emite e escutar, se inscrever pra ouvir)
    debounce: Subject<string> = new Subject<string>();
    
    ngOnInit(): void {
        this.debounce
        .pipe(debounceTime(300)) // inscrito no subject para ouvir e aplicar só caso pare 3 segundo
        .subscribe(filter => this.onTyping.emit(filter)); // ontyping emite o valor do filtro
    }    // o subject fica lendo mas fica quardado na memória entao precisa do on destroy(unsubscribe)
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
 }