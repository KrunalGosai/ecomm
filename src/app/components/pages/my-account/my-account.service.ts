import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  

  constructor(private http:HttpClient) { }

  private baseUrl = environment.SERVER_URL;

  public signUp(email:string,password:string){
    let user = {
      email:email,
      password:password
    }
    return this.http.post(this.baseUrl+'/signup',user)
  }

  public signIn(email:string,password:string) {
    let user = {
      email:email,
      password:password
    }
    return this.http.post(this.baseUrl+'/users/login',user)
  }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(name) {
    this.setCookie({name:name,value:'',expireDays:-1});
  }

  // public setCookie(name: string, value: string, expireDays: number, path: string = "") {
  //   let d: Date = new Date();
  //   d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  //   let expires: string = "expires=" + d.toUTCString();
  //   document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  // }

  /**
   * Expires default 1 day 
   * If params.session is set and true expires is not added
   * If params.path is not set or value is not greater than 0 its default value will be root "/"
   * Secure flag can be activated only with https implemented
   * Examples of usage:
   * {service instance}.setCookie({name:'token',value:'abcd12345', session:true }); <- This cookie will not expire
   * {service instance}.setCookie({name:'userName',value:'John Doe', secure:true }); <- If page is not https then secure will not apply
   * {service instance}.setCookie({name:'niceCar', value:'red', expireDays:10 }); <- For all this examples if path is not provided default will be root
   */

  public setCookie(params:cookie) 
  {
    let d: Date = new Date();
    d.setTime(d.getTime() + (params.expireDays ? params.expireDays:1) * 24 * 60 * 60 * 1000); 
    document.cookie = 
        (params.name? params.name:'') + "=" + (params.value?params.value:'') + ";"
        + (params.session && params.session == true ? "" : "expires=" + d.toUTCString() + ";")
        + "path=" +(params.path && params.path.length > 0 ? params.path:"/") + ";"
        + (location.protocol === 'https:' && params.secure && params.secure == true ? "secure":"");
  }
}

export interface cookie{
  name?:string,
  value?:string,
  session?:boolean,
  expireDays?:number,
  path?:string,
  secure?:boolean
}
