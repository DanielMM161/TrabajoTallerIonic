import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Incidence } from '../models/incidence';
 
@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

  private incidenceService: AngularFirestore;
  private incidents: Observable<Incidence[]>;
  private incidenceCollection: AngularFirestoreCollection<Incidence>;

  constructor(private afs: AngularFirestore) {
    this.incidenceService = afs;
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

  public getIncidents() {
    return this.incidents;
  }

  public getIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc<Incidence>(incidence.id).valueChanges();
  }

  public addIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc(incidence.id).set({ incidence });
  }

  public updateIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc(incidence.id).update(
      {
        car: incidence.idCar,
        state: incidence.state,
        details: incidence.state
      }
    );
  }

  public getLengthIncidenceDoc() {
    this.incidents.subscribe(res => {
      console.log(res.length);
      return res.length;
    });
  }

  public getIncidenceService() {
    return this.incidenceService;
  }

  public deleteIncidence(incidence: Incidence) {
    return this.incidenceCollection.doc(incidence.id).delete();
  }
}