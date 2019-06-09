import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../app.interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;
const headers = new HttpHeaders({'X-Api-key':apiKey});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage:number = 0;
  country:string = 'co';
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query:string){
    query = apiURL + query;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadLines(){
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=${this.country}&page=${this.headLinesPage}`)
  }

  getTopHeadLinesCategories(categoria:string){
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=${this.country}&category=${categoria}&page=${this.categoriaPage}`);
  }
}
