import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject, ObjectUnsubscribedError } from 'rxjs';
import { clientes} from '../models/clientes';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { addAllToArray } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  db: AngularFirestore;
  private todosCollection: AngularFirestoreCollection<clientes>;
  private todos: Observable<clientes[]>;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.todosCollection = db.collection<clientes>('clientes');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
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
    *Este metodo me hace una consulta a la Bd y en el caso de que exista el dato deseado recoge todos los datos 
    del documento
    */
   checkNif(nif: string, user: clientes) {
    const usersCollection = this.db.collection<clientes[]>('clientes', ref => ref.where('nif', '==', nif));
    const users = usersCollection.snapshotChanges();
    const pr = users.subscribe(snap => {
      if (snap.length === 0) {
        console.log('No existe');
        pr.unsubscribe();
      } else {
          console.log('Si existe', snap);
          snap.forEach(a => {
            user.nif = a.payload.doc.get('nif');
            user.name = a.payload.doc.get('name');
            user.phone = a.payload.doc.get('phone');
            user.address = a.payload.doc.get('address');
            user.email = a.payload.doc.get('email');
            pr.unsubscribe();
          });
        }
      });
   }
   getTodos() {
     return this.todos;
   }

   getTodo(id: string){
    return this.todosCollection.doc<clientes>(id).valueChanges();
   }

   updateTodo(todos: clientes, id: string){
     return this.todosCollection.doc(id).update(todos);
   }

   addTodo(todo: clientes){
    return this.todosCollection.add(todo);
   }

   removeTodo(id: string){
    return this.todosCollection.doc(id).delete();
   }

}
