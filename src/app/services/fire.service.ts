import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { clientes} from '../models/clientes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private todosCollection: AngularFirestoreCollection<clientes>;
  private todos: Observable<clientes[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<clientes>('clientes');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ))
   }

   getTodos(){
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
