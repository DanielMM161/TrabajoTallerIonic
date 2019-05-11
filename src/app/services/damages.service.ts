import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DamagesService {

 
  private id: string;
  private damages = [];

  constructor() { }

  setDamages(damages){
    this.damages = damages;
  }

  getDamages(){

    return this.damages;
  }

  setId( id ){
    this.id = id;
  }

  getId(){
    return this.id;
  }
}
