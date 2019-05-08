import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vehicles } from '../models/vehicles';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private db: AngularFirestore;
  private vehicles: Observable<Vehicles[]>;
  private vehicleCollection: AngularFirestoreCollection<Vehicles>;

  constructor(private afs: AngularFirestore ) {
    this.db = afs;
    this.vehicleCollection = this.afs.collection<Vehicles>('vehicles');
    this.vehicles = this.vehicleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   /**
    * Este metodo hace una consulta a la collecion Vehicles y en el caso que exista la matricula del vehiculo
    * recoge todos los datos de el
    */
   checkEnrollment(enrollment: string, vehicle: Vehicles) {
    const vehicleCollection = this.db.collection<Vehicles[]>('vehicles', ref => ref.where('enrollment', '==', enrollment));
    const vehicles = vehicleCollection.snapshotChanges();
    const pr = vehicles.subscribe(snap => {
      if (snap.length === 0) {
        console.log('No existe');
        pr.unsubscribe();
      } else {
          console.log('Si existe', snap);
          snap.forEach(a => {
            vehicle.enrollment = a.payload.doc.get('enrollment');
            vehicle.brand = a.payload.doc.get('brand');
            vehicle.model = a.payload.doc.get('model');
            vehicle.kilometers = a.payload.doc.get('kilometers');
            vehicle.color = a.payload.doc.get('color');
            vehicle.age = a.payload.doc.get('age');
            pr.unsubscribe();
          });
        }
      });
   }

   updateVehicles(vehicles: Vehicles, enrollment: string) {
    return this.vehicleCollection.doc(enrollment).update(vehicles);
  }

   addVehicles(vehicle: Vehicles) {
    return this.vehicleCollection.add(vehicle);
  }
}
