import { LoadingController } from '@ionic/angular';


export class Loading{

    constructor(public loadingcontroller: LoadingController){

    }

    async presentLoading() {
        const loading = await this.loadingcontroller.create({
        message: 'Guardando',
        });
        await loading.present();
    }

    cerrar(){
        this.loadingcontroller.dismiss();
    }

}