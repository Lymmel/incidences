import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';

import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userFB: User;
  constructor(private auth: AuthServiceService, private ui: UiComponent, private router: Router) { 
    this.userFB={
      email:null,
      password:null
    }
  }

  ngOnInit() {
  }

  public async loginGoogle() {
    console.log("Logging...");
    this.ui.presentLoading();
    try{
      const r: boolean = await this.auth.loginGoogle();
      this.ui.hideLoading();
      if (r) {
        console.log("gggg");
        this.router.navigateByUrl('/tabs/tab1').catch(errr =>{
          console.log(errr);
        })
      }
    }catch(err){
      console.log(err);
    }
    
  }

  async onLogin() {
    try {
        await this.auth.onLogin(this.userFB);
        this.router.navigate(['/tabs/tab1']);
      
    } catch (err) {
      this.userFB=null;
      console.log(err)
    }
  }

}
