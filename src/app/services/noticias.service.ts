import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnswerTopHeadLines } from '../app.interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;
const headers = new HttpHeaders({'X-Api-key':apiKey});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headLinesPage:number = 0;
  country:string = 'co';
  Currentcategory = '';
  CategoryPage = 0;

  constructor(private http: HttpClient) { }

  private runQuery<T>(query:string){
    query = apiURL + query;
    return this.http.get<T>(query,{headers});
  }

  getTopHeadLines(){
    this.headLinesPage++;
    return this.runQuery<AnswerTopHeadLines>(`/top-headlines?country=${this.country}&page=${this.headLinesPage}`)
  }

  getTopHeadLinesCategories(category: string){
    if(this.Currentcategory === category){
      this.CategoryPage++;
    }else{
      this.CategoryPage = 1;
      this.Currentcategory = category;
    }
    return this.runQuery<AnswerTopHeadLines>(`/top-headlines?country=${this.country}&category=${category}&page=${this.CategoryPage}`);
  }
}
