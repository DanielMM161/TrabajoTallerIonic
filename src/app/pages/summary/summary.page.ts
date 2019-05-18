import { Component, OnInit, ViewChild } from '@angular/core';
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


  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  ctx;

  ngOnInit() {

    this.id = this.damageService.getId();
    this.customer = this.damageService.getCustomer();
    this.vehicle = this.damageService.getVehicle();
    this.damages = this.damageService.getDamages();

    this.canvasElement = this.canvas.nativeElement;
    this.setBackgroundImage();
    this.canvasElement.width = document.body.clientWidth*4/ 5;
    this.canvasElement.height = (document.body.clientHeight*4)/12;
    this.ctx = this.canvasElement.getContext('2d');
    
  }

  setBackgroundImage(){
    let context = this.canvasElement.getContext("2d");

    var background = new Image();
    background.src = this.damageService.incidence.imagePath;

    background.onload = function(){
      context.drawImage(background,0,0, document.body.clientWidth*4/5, (document.body.clientHeight*4)/12);   
    }
  }



}
