import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {
  // para disponibilizar para quem quiser usar, coloca @input
  @Input() hasMore: boolean = false;
 // em photolistcomponent tera de ter essa mesma propriedade
  constructor() { }

  ngOnInit() {
  }

}
