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

  getCustomer(customer: Customer){
    return this.firestore.collection('customers').doc(customer.nif).snapshotChanges();
  }

  createCustomer(customer: Customer){
    return this.firestore.collection('customers').doc(customer.nif).set(customer);

  }

  updateCustomer(customer: Customer, customerId: string){
    this.firestore.collection('customers').doc(customer.nif).set(customer);
  }

}
