import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import{ Incidence} from '../models/incidence'
 
@Injectable({
  providedIn: 'root'
})
export class IncidenceService {
  private incidents: Observable<Incidence[]>;
  private incidenceCollection: AngularFirestoreCollection<Incidence>;
 
  constructor(private afs: AngularFirestore) {
    this.incidenceCollection = this.afs.collection<Incidence>('incidents');
    this.incidents = this.incidenceCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getIncidents() {
    return this.incidents;
  }
 
  getIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc<Incidence>(incidence.id).valueChanges();
  }
 
  addIncidence(incidence: Incidence){
    return this.incidenceCollection.add(incidence);
  }
 
  updateIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc(incidence.id).update(
      { 
        car: incidence.car,
        state: incidence.state,
        details: incidence.details
      }
    );
  }
 
  deleteIncidence(incidence: Incidence){
    return this.incidenceCollection.doc(incidence.id).delete();
  }
}