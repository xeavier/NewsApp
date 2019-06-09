import { Article } from './../../app.interfaces';
import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  paises:any[] = [
    { label:'Argentina', value:'ar' },
    { label:'Estados Unidos', value:'us' },
    { label:'Colombia', value:'co' },
    { label:'México', value:'mx' },
    { label:'Venezuela', value:'ve' },
  ]
  inputs:any[] = [];

  constructor(private noticiasService:NoticiasService, private alertCtrl:AlertController,
              private actionSheetCtrl:ActionSheetController) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    console.log(event)
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines().subscribe(data => {
      if(data.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...data.articles );
      if(event){
        event.target.complete();
      }
    });
  }

  async mostrarAction() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Visualizar noticias de',
      buttons: this.cargarBotones()
    });
    await actionSheet.present();
  }

  cargarBotones(){
    let botones:any[] = []
    this.paises.map(item => {
      botones.push({
        text:item['label'],
        handler: () => {
          this.noticiasService.country = item['value'];
          this.noticiasService.headLinesPage = 0;
          this.noticias = [];
          this.cargarNoticias();
        }
      });
    });
    return botones
  }

  async mostrarAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Visualizar noticias de',
      inputs: this.cargarInputs(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }

  cargarInputs(){
    let inputs:any[] = []
    this.paises.map(item => {
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
