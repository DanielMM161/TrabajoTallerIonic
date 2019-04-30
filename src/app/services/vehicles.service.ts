import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vehicles } from '../models/vehicles';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehicles: Observable<Vehicles[]>;
  private vehicleCollection: AngularFirestoreCollection<Vehicles>;

  constructor(private afs: AngularFirestore ) {
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

   updateVehicles(vehicles: Vehicles, enrollment: string){
    return this.vehicleCollection.doc(enrollment).update(vehicles);
  }

   addVehicles(vehicle: Vehicles){
    return this.vehicleCollection.add(vehicle);
  }
}
