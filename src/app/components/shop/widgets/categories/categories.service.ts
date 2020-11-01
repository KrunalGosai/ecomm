import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_URL;

  public getAllCategories(){
    return this.http.get(this.baseUrl+'/categories');
  }

  public getMainCategories(){
    let filter = `?filter={"include":[{"relation":"categories"}]}`;
    return this.http.get(this.baseUrl+'/maincategories'+filter);
  }

}
