import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { firestore } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { Incidence } from '../model/Incidence';

@Injectable({
  providedIn: 'root'
})
export class IncidenceserviceService {

  myCollection: AngularFirestoreCollection;

  constructor(private fireStore: AngularFirestore) {
    this.myCollection = fireStore.collection<any>(environment.collection);
  }


  readINCIDENCE():Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  readINCIDENCE2(timer:number=10000):Observable<Incidence[]>{
    return new Observable((observer)=>{
      let subscripcion:Subscription;
      let tempo = setTimeout(() => {
        subscripcion.unsubscribe();
        observer.error("Timeout");
      },timer);
      subscripcion = this.readINCIDENCE().subscribe((lista) => {
        clearTimeout(tempo);
        let listado=[];
        lista.docs.forEach((Incidence) => {
          //este push nos da el id de la incidencia y con los ... rellena con todos los campos de nota.
          listado.push({ id: Incidence.id, ...Incidence.data() });
        });
        observer.next(listado);
        observer.complete();
      })
    })
  }

  addIncidencia(myincidence:Incidence):Promise<firebase.firestore.DocumentReference>{
    return this.myCollection.add(myincidence);
  }

  readIncidenciaByID(id:string):Observable<firebase.firestore.DocumentSnapshot>{
    return this.myCollection.doc(id).get();
  }

  updateIncidencia(id:string,data:Incidence):Promise<void>{
    return this.myCollection.doc(id).set(data);
  }

  deleteIncidencia(id:string):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

}
