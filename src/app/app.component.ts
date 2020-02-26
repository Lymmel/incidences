import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from './services/auth-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global:Globalization,
    private translate:TranslateService,
    private auth:AuthServiceService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(async () => {
      //Ya podeis ejecutar lo que queráis
      this.translate.setDefaultLang('en');
      this.global.getPreferredLanguage().then(v=>{
        console.log(v);
        const language=v.value.substring(0,2);
        if(language=== 'es'){
          this.translate.use('es');
        }else{
          this.translate.use('en');
        }
      }).catch(err=>this.translate.use('en'));
      await this.auth.checkSession();
      /**He comprobado si puedes ir o no a login */
      //Es otra forma de proteger
      if(this.auth.isAuthenticated()){
        this.router.events.subscribe(event=>{
          if(event instanceof NavigationEnd){
            if(this.router.url==='/' || this.router.url==='/login'){
              this.router.navigate(['/tabs']);
            }
          }
        })
      }
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
}
