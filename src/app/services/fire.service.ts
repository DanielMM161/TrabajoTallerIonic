import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { clientes} from '../models/clientes';
import { map } from 'rxjs/operators';

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
   checkNif(nif: string, user: clientes, auxUser: clientes) {
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


   getTodos() {
     return this.todos;
   }

   getTodo(id: string){
    return this.todosCollection.doc<clientes>(id).valueChanges();
   }

   updateTodo(todos: clientes){
     return this.todosCollection.doc(todos.nif).set(todos);
   }

   addTodo(todo: clientes) {
    this.todosCollection.doc(todo.nif).set({todo});
   }

   removeTodo(id: string){
    return this.todosCollection.doc(id).delete();
   }

}
