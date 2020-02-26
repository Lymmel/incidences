import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globalization } from '@ionic-native/globalization/ngx';

//*
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { MenuComponent } from './menu/menu.component';

//utilities imports
import { Toast } from './utilities/Toast';
import { Loading } from './utilities/Loading';
import { Alert } from './utilities/Alert';
import { PipesModule } from './pipes/pipes.module';
import {UiComponent } from './common/ui/ui.component';
import { ModalPage } from './modal/modal.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPageModule } from './modal/modal.module';


@NgModule({
  declarations: [AppComponent, MenuComponent, UiComponent],
  entryComponents: [ModalPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    ModalPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports:[
    MenuComponent,
    UiComponent,
  ],

 
  providers: [
    GooglePlus,
    NativeStorage,
    AuthGuardService,
    AuthServiceService,
    TranslateService,
    HttpClient,
    Globalization,
    StatusBar,
    SplashScreen,
    Toast,
    Loading,
    Alert,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
