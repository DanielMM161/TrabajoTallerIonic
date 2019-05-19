import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Vehicle } from '../models/vehicle';
import { Incidence } from '../models/incidence';
import { Details } from '../models/details';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DamagesService {

 
  private id: string;
  private customer: Customer;
  private vehicle: Vehicle;
  private damages = [];
  private image = new Image();
  incidence: Incidence;
  details: Details = {
    id: '',
    idIncidence: '',
    damages: [],
    internDamages: []
  };
  viewDamageList: Boolean = false;

  constructor(private detailsService: AngularFirestore) {
   }

  setViewDamageList(res: Boolean){
    this.viewDamageList = res;
  }

  getViewDamageList(){
    return this.viewDamageList;
  }

  setDamages(damages) {
    this.damages = damages;
  }

  getDamages() {
    return this.damages;
  }

  setDetails(detail: Details) {
    this.details = detail;
  }

  getDetails() {
    return this.details;
  }

  setIncidence(inc: Incidence){
    this.incidence = inc;
  }

  getIncidence() {
    return this.incidence;
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

  setImage( image){
    this.image = image;
  }
  getImage(){
    return this.image;
  }

  //Methods of Details
  getAllDetailsDB() {
    return this.detailsService.collection('details').snapshotChanges();
  }

  getDetailDB(id: any){
    return this.detailsService.collection('details').doc(id).snapshotChanges();
  }

  createDetails(details: Details){
    return this.detailsService.collection('details').doc(details.id).set(details);

  }

  updateDetails(details: Details){
    this.detailsService.collection('details').doc(details.id).set(details);
  }

  updateInterDamages(details: Details) {
    return this.detailsService.collection('details').doc(details.id).set(details);
  }

}
