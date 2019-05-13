import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class DamagesService {

 
  private id: string;
  private customer: Customer;
  private vehicle: Vehicle;
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

  setCustomer( customer: Customer ){
    this.customer = customer;
  }

  getCustomer(){
    return this.customer;
  }

  setVehicle( vehicle: Vehicle){
    this.vehicle = vehicle;
  }
  getVehicle(){
    return this.vehicle;
  }
}
