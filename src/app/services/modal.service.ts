import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalCtrl: ModalController) {

  }
  
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: Tab1Page
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
