import { Article } from './../../app.interfaces';
import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(){
    this.noticiasService.getTopHeadLines().subscribe(data => {
      this.noticias.push( ...data.articles );
    });
  }
}
