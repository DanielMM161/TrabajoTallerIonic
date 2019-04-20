import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"
import { promise } from 'protractor';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFAuth: AngularFireAuth) { 
    
  }

  login(email:string, password:string){

      return new Promise((resolve, rejected) => {
        this.AFAuth.auth.signInWithEmailAndPassword(email, password).then(user=>{
                resolve(user)

              }).catch(err => rejected(err))
      });

      
    }
}
