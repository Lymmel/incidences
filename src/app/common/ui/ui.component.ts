import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'ui.component',
  templateUrl: 'ui.component.html',
  styleUrls: ['ui.component.scss']
})
export class UiComponent implements OnInit {
  constructor(public loadingController: LoadingController) { }
  loading:HTMLIonLoadingElement;
  ngOnInit(){}

  public async presentLoading() {
    await this.hideLoading();
    if(this.loading){
      this.loading.dismiss();
    }
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
  }

  public async hideLoading(){
    if(this.loading){
      await this.loading.dismiss();
    }
    this.loading=null;
  }


}