import { Router } from '@angular/router';
import { MyAccountService } from './../my-account/my-account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService:MyAccountService,private router:Router) { }

  ngOnInit(): void {
    let token = this.accountService.getCookie('authtoken');
    if(!token || token.trim() == ''){
      this.router.navigate(['/pages','my-account']);
    }

  }

  logoutclick(){
    this.accountService.deleteCookie('authtoken');
    this.router.navigate(['/pages','my-account']);


  }

}
