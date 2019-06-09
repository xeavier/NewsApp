import { Article } from 'src/app/app.interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() indexNoticia:number;
  
  constructor() { }

  ngOnInit() {}

}
