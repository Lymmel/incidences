import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public misaludo:string;
  constructor(private translate:TranslateService, public auth:AuthServiceService,
   private afMyAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter(){
    this.translate.get('hello')
    .subscribe(value=>{
      console.log(value);
      this.misaludo=value;
    })
  }

  public cambiarEsp(){
    this.translate.use('es');
  }

  public cambiarEng(){
    this.translate.use('en');
  }

  public logout(){
    this.auth.logout();
  }

  public goToAboutAPP(){
    this.router.navigateByUrl('sobreapp');
  }
  
}
