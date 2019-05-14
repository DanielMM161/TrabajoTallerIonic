import { Component, OnInit } from '@angular/core';
import { DrawimagePage } from '../drawimage/drawimage.page';
import { DamagesService } from 'src/app/services/damages.service';
import { Customer } from 'src/app/models/customer';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  constructor(private damageService: DamagesService) { }

  public id: string;
  public customer: Customer;
  public vehicle: Vehicle;
  public damages = [];


  ngOnInit() {

    this.id = this.damageService.getId();
    this.customer = this.damageService.getCustomer();
    this.vehicle = this.damageService.getVehicle();
    this.damages = this.damageService.getDamages();
    
  }

}
