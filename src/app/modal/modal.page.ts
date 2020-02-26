import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Incidence } from '../model/Incidence'
import { IncidenceserviceService } from '../services/incidenceservice.service';
import { Toast } from '../utilities/Toast';
import { Loading } from '../utilities/Loading';
import { NavController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public listadoPanel;
  //Lo que le pasas al modal
  @Input() id: string;
  @Input() misDatos:Incidence;
  
  
  public incidenceForm2: FormGroup;

  constructor(private formBuilder: FormBuilder, private incidenceS: IncidenceserviceService,
    private myLoading: Loading, public myToast:Toast, private nav:NavController, private modalCtrl:ModalController,
    navParams:NavParams) {
      this.id = navParams.get('id');
      this.misDatos = navParams.get('Incidence');
  }

  ngOnInit() {
    this.incidenceForm2 = this.formBuilder.group({
      title: [this.misDatos.title, Validators.required],
      description: [this.misDatos.description],
      image: [this.misDatos.image],
      video: [this.misDatos.video]
    });
  }

  editIncidence() {
    let data: Incidence;
    data = {
      title: this.incidenceForm2.get('title').value,
      description: this.incidenceForm2.get('description').value,
      image: this.incidenceForm2.get('image').value,
      video: this.incidenceForm2.get('video').value
    }
    this.myLoading.presentLoading();
    this.incidenceS.updateIncidencia(this.id,data)
    .then((ok)=>{
      this.incidenceForm2.reset();
      this.myToast.presentToast("Incidencia editada", 'success');
    })
    .catch((err)=>{
      this.myToast.presentToast("Error", 'danger', 4000);
    })
    .finally(()=>{
      this.myLoading.cerrar();
      this.modalCtrl.dismiss();
    })
  }

  private async refrescar() {
    await this.myLoading.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando incidencias...");
    try {
      this.incidenceS.readINCIDENCE2().subscribe((listado) => {
        this.listadoPanel = listado;
        this.myLoading.cerrar();
      },
        error => {

        });
    } catch (err) {
      this.myLoading.cerrar();  
    }
    console.log("Solicitada la petición");
  }
}
