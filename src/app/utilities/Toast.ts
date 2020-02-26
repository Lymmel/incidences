import { ToastController } from '@ionic/angular';

export class Toast {

    constructor(public toastcontroller: ToastController){
        
    }

    //col = color "danger" o "success"
    async presentToast(msg: string, col: string, dur: number = 2000) {
        const toast = await this.toastcontroller.create({
            message: msg,
            duration: dur,
            color: col
        });
        toast.present();
    }


}