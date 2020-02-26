import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

export class Alert {

    constructor(public alertController: AlertController) { }

    myPromiseAlert: Promise<boolean>;

    async presentAlert() {
        let ok: boolean = false;
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: '¿Estás seguro de borrar la nota?',
            buttons: [
                {
                    text: 'No.',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Si.',
                    handler: () => {
                        console.log('Confirm Ok');
                        ok=true;
                    }
                }
            ]
        });

        await alert.present();

        return this.myPromiseAlert = new Promise((result, error) => {
            alert.onWillDismiss().then(() => {
                result(ok);
            }).catch((err) => {
                error(err);
            });
        })
    }



}

