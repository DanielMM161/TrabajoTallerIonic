import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Customer} from '../models/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  db: AngularFirestore;
  private customerCollection: AngularFirestoreCollection<Customer>;
  private customer: Observable<Customer[]>;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.customerCollection = db.collection<Customer>('clientes');
    this.customer = this.customerCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   /**
    *Este metodo me hace una consulta a la Bd y en el caso de que exista el dato deseado recoge customer los datos 
    del documento
    */
   checkNif( user: Customer, auxUser: Customer) {
     this.db.collection('clientes').doc(user.nif).get().toPromise().then(res => {
      const d = res.data();
      user.nif = d.nif;
      user.name = d.name;
      user.phone = d.phone;
      user.email = d.email;
      user.address = d.address;

      auxUser.nif = d.nif;
      auxUser.name = d.name;
      auxUser.phone = d.phone;
      auxUser.email = d.email;
      auxUser.address = d.address;
    });
  }


   getCustomers() {
     return this.customer;
   }

   getCustomer(id: string){
    return this.customerCollection.doc<Customer>(id).valueChanges();
   }

   updateCustomer(customer: Customer){
     return this.customerCollection.doc(customer.nif).set(customer);
   }

   addCustomer(todo: Customer) {
    this.customerCollection.doc(todo.nif).set({todo});
   }

   removeCustomer(id: string){
    return this.customerCollection.doc(id).delete();
   }

}
