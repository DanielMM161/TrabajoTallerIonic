import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: AngularFirestore) {   }

  checkNif(user: Customer) {
    const usersCollection = this.firestore.collection('customers').doc(user.nif).get().toPromise().then(function(data){
      if(data.exists){
        user.nif = data.get('nif');
        user.name = data.get('name');
        user.phone = data.get('phone');
        user.address = data.get('address');
        user.email = data.get('email');
      } else{
        console.log('no existe');
      }
    });
   }

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
