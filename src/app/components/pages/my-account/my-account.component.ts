import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { MyAccountService } from './my-account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {

  constructor(public accountService:MyAccountService,
    public snackBar: MatSnackBar,
    public router:Router) { }

  public showForm = true;

  ngOnInit() {
    let token = this.accountService.getCookie('authtoken');
    if(token && token.trim() != ''){
      this.router.navigate(['/']);
    }
  }

  public submitSignup(name,password){
    if(name.value && password.value){
      this.accountService.signUp(name.value,password.value).toPromise().then(res => {
        this.showForm = false;
        this.snackBar.open('Signup successfully please login !!', 'dismiss', {
          duration: 5000,
        });
      }).catch(err => {
        console.log(err)
      })
    }else{
      this.snackBar.open('Invalid User Input','dismiss',{duration:5000})
    }
  }

  public validateLogin(name,password){
    if(name.value && password.value){
      this.accountService.signIn(name.value,password.value).toPromise().then(res => {
        let data:any = res;
        this.accountService.setCookie({name:'authtoken',value:data.token})
        this.router.navigate(['/home/main']);
      })
    }else{
      this.snackBar.open('Invalid User Input','dismiss',{duration:5000})
    }
  }



}


