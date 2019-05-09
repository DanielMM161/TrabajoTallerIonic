import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DamagesService {

  damages= [];
  
  constructor() { }

  setDamages(damages){
    this.damages = damages;
  }

  getDamages(){

    return this.damages;
  }
}
