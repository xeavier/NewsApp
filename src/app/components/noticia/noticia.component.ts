import { DataLocalService } from './../../services/data-local.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/app.interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() indexNoticia:number;
  @Input() enFavoritos;
  
  constructor(private iab: InAppBrowser, 
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataService: DataLocalService,
              private platform: Platform) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url,'_system');
  }

  async lanzarMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons:[
        {
          text:'Compartir',
          icon:'share',
          cssClass:'action-dark',
          handler: () => this.compartirNoticia()
        },
        {
          text: this.enFavoritos?'Borrar favorito':'Favorito',
          icon:this.enFavoritos?'trash':'star',
          cssClass:'action-dark',
          handler: () => {
            this.enFavoritos?this.dataService.borrarNoticia(this.noticia):this.dataService.guardarNoticia(this.noticia)
          }
        },
        {
          text:'Cancelar',
          icon:'close',
          role:'cancel',
          cssClass:'action-dark',
        }
      ]
    });
    await actionSheet.present();
  }

  compartirNoticia(){
    if(this.platform.is('cordova')){
      this.socialSharing.share(this.noticia.title, this.noticia.source.name,'',this.noticia.url);
    }
    else {
      if(navigator['share']){
        navigator['share']({
          title:this.noticia.title,
          text:this.noticia.description,
          url:this.noticia.url
        })
        .then(() => console.log('Successful share'))
        .catch((err) => console.log('Error sharing', err))
      }
      else {
        console.log('Sharing not supported');
      }
    }
  }
}
