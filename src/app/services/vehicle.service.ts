import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle } from '../models/vehicle';



@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private firestore: AngularFirestore) {   }

  getAllVehicle() {
    return this.firestore.collection('vehicles').snapshotChanges();
  }

  getVehicle(vehicleId: string){
    return this.firestore.collection('customers').doc(vehicleId).snapshotChanges();
  }

  createVehicle(vehicle: Vehicle){
    return this.firestore.collection('vehicles').add(vehicle);
  }

  updateVehicle(vehicle: Vehicle, vehicleId){
    this.firestore.collection('vehicles').doc(vehicleId).set(vehicle);
  }
  
}
