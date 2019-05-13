import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: AngularFirestore) {   }

  getAllCustomer() {
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomer(customerId: string){
    return this.firestore.collection('customers').doc(customerId).snapshotChanges();
  }

  createCustomer(customer: Customer){
    return this.firestore.collection('customers').add(customer);

  }

  updateCustomer(customer: Customer, customerId: string){
    
    this.firestore.collection('customers').doc(customerId).set(customer);
  }

}
