import { Article } from './../../app.interfaces';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/noticias.service';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];
  countries: any[] = [
    { label:'Argentina', value:'ar' },
    { label:'India', value:'in' },
    { label:'Colombia', value:'co' },
    { label:'México', value:'mx' },
    { label:'Venezuela', value:'ve' },
  ]
  inputs:any[] = [];

  constructor(private newsService: NewsService, private alertCtrl:AlertController,
              private actionSheetCtrl:ActionSheetController) {}

  ngOnInit(){
    this.loadNews();
  }

  loadData(event){
    this.loadNews(event);
  }

  loadNews(event?){
    this.newsService.getTopHeadLines().subscribe(data => {
      if(data.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.news.push( ...data.articles );
      if(event){
        event.target.complete();
      }
    });
  }

  async showAction() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'View news from',
      buttons: this.load buttons()
    });
    await actionSheet.present();
  }

  load buttons(){
    let buttons: any[] = []
    this.countries.map(item => {
      buttons.push({
        text:item['label'],
        cssClass:'action-dark',
        icon:'globe',        
        handler: () => {
          this.newsService.country = item['value'];
          this.newsService.headLinesPage = 0;
          this.news = [];
          this.loadNews();
        }
      });
    });
    return buttons
  }

  async showAlert(){
    const alert = await this.alertCtrl.create({
      header: 'View news from',
      inputs: this.loadInputs(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Toaccept',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }

  loadInputs(){
    let inputs:any[] = []
    this.countries.map(item => {
      inputs.push({
        type:'checkbox',
        label:item['label'],
        value:item['value'],
        checked:item['value']=='co'?true:false
      });
    });
    console.log(inputs);
    return inputs
  }
}
