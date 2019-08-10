import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/app.interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment:IonSegment;
  categories: any[] =['technology','science','sports','business','entertainment','general','health'];
  news: Article[] = [];

  constructor(private newsService: NewsService){}
  
  ngOnInit(){
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);    
  }

  loadData(event){
    this.loadNews(this.segment.value,event);
  }

  changeCategory(event){
    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadNews(category: string,event?){
    this.newsService.getTopHeadLinesCategories(category).subscribe(resp => {
      this.news.push(...resp.articles);
      if(event){
        event.target.complete();
      }
    });
  }
}
