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
   checkEnrollment(enrollment: string, vehicle: Vehicles, auxVehicle: Vehicles) {
    this.db.collection('vehicles').doc(vehicle.enrollment).get().toPromise().then(res => {
      const d = res.data();
      vehicle.enrollment = d.enrollment;
      vehicle.model = d.model;
      vehicle.brand = d.brand;
      vehicle.kilometers = d.kilometers;
      vehicle.color = d.color;
      vehicle.age = d.age;

      auxVehicle.enrollment = d.enrollment;
      auxVehicle.model = d.model;
      auxVehicle.brand = d.brand;
      auxVehicle.kilometers = d.kilometers;
      auxVehicle.color = d.color;
      auxVehicle.age = d.age;
    });
   }

   updateVehicles(vehicles: Vehicles) {
    return this.vehicleCollection.doc(vehicles.enrollment).set(vehicles);
  }

   addVehicles(vehicle: Vehicles) {
    return this.vehicleCollection.doc(vehicle.enrollment).set({vehicle});
  }
}
