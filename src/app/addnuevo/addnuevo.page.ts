import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Incidence } from '../model/Incidence';
import { IncidenceserviceService } from '../services/incidenceservice.service';
import { Toast } from '../utilities/Toast';
import { Loading } from '../utilities/Loading';

@Component({
  selector: 'app-addnuevo',
  templateUrl: './addnuevo.page.html',
  styleUrls: ['./addnuevo.page.scss'],
})
export class AddnuevoPage{

  public incidenceForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private incidenceS: IncidenceserviceService,
    private myLoading: Loading, public myToast:Toast) {
  }

  ngOnInit() {
    this.incidenceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      image: [''],
      video: ['']
    });
  }

  addIncidence() {
    let data: Incidence;
    data = {
      title: this.incidenceForm.get('title').value,
      description: this.incidenceForm.get('description').value,
      image: this.incidenceForm.get('image').value,
      video: this.incidenceForm.get('video').value,
    }
    this.myLoading.presentLoading();

    this.incidenceS.addIncidencia(data)
    .then((ok)=>{
      this.incidenceForm.reset();
      this.myToast.presentToast("Incidencia agregada", 'success');
    })
    .catch((err)=>{
      this.myToast.presentToast("Error", 'danger', 4000);
    })
    .finally(()=>{
      this.myLoading.cerrar();
    })
  }
}
