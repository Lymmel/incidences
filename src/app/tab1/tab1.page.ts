import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Loading } from '../utilities/Loading';
import { Alert } from '../utilities/Alert';
import { Toast } from '../utilities/Toast';
import { Incidence } from '../model/Incidence'
import { IncidenceserviceService } from '../services/incidenceservice.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public misaludo:string;
  public listadoPanel;
  dato1:string;
  dato2:string;
  textoBuscar = '';

  constructor(private translate:TranslateService, public auth:AuthServiceService,
   private afMyAuth: AngularFireAuth, private router: Router, private menuCtrl: MenuController,
   private myLoading: Loading, private myAlert: Alert, public myToast:Toast, private incidenceS: IncidenceserviceService,
   public modalCtrl: ModalController) {}

  ngOnInit() {
    this.refrescar();
  }

  public onLogout(){
    console.log('Desconectado!');
    this.afMyAuth.auth.signOut();
    this.router.navigateByUrl('login');
  }

  goToMenu() {
    this.menuCtrl.toggle();
  }

  private async refrescar() {
    console.log("hi");
    await this.myLoading.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando incidencias...");
    try {
      this.incidenceS.readINCIDENCE2().subscribe((listado) => {
        if(listado){
          this.listadoPanel = listado;
          this.myLoading.cerrar();
        }
        
      },
        error => {

        });
    } catch (err) {
      this.myLoading.cerrar();
    }
    console.log("Solicitada la petición");
  }


  public borraIncidencia(id: string) {
    console.log("BORRANDO...");
    this.myAlert.presentAlert().then((success:boolean) =>{
      if(success){
        this.incidenceS.deleteIncidencia(id).then((salida) => {
          this.refrescar();
          this.myToast.presentToast("Incidencia borrada correctamente", 'success');
        }).catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) =>{
      console.log(err);
    })
  }

  public buscar(event) {
    //console.log(event);
    this.textoBuscar = event.detail.value;
  }

  public doRefresh(e: any) {
    this.myLoading.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando incidencias...");
    this.incidenceS.readINCIDENCE2().subscribe((listado) => {
      this.listadoPanel = listado;
      this.myLoading.cerrar();

      e.target.complete()
    },
      error => {

        e.target.complete()
      });
  }

  public irNueva(): void {
    this.router.navigateByUrl('addnuevo');
  }

  

  
  async presentModal(id:string, misDatos:Incidence) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:{
        'id': id,
        'Incidence': misDatos
      }
    });
    return await modal.present();
  }
  

}
