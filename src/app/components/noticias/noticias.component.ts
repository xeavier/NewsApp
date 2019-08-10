import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/app.interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() news: Article[] = [];
  @Input() isFavorites = false;
  
  constructor() { }

  ngOnInit() {}

}
