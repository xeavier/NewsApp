import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../app.interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.loadfavorites();
  }

  async showToast(message: string){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  saveNews(news: Article){
    const exists = this.news.find(noti => noti.title === news.title);
    if(!exists){
      this.news.unshift(news);
      this.storage.set('favorites', this.news);  
      this.showToast('Added to favorites')
    }
  }

  deleteNews(news: Article){
    this.news = this.news.filter(noti => noti.title !== news.title);
    this.storage.set('favorites', this.news);  
    this.showToast('Deleted from favorites')
  }

  async loadfavorites(){
    const favorites= await this.storage.get('favorites');
    favorites && (this.news = favorites);
  }
}
