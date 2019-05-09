import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DamagesService } from 'src/app/services/damages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawimage',
  templateUrl: './drawimage.page.html',
  styleUrls: ['./drawimage.page.scss'],
})
export class DrawimagePage implements OnInit {

  averias = [];
  ngOnInit(): void {
  }

  constructor(public damageService: DamagesService, public route: Router){

  }

  recogeArray(event){
    this.averias = event;
    console.log(this.averias);
  }

  goDamageList( damages){
    this.damageService.setDamages(this.averias);
    this.route.navigate(['/damagelist']);
  }

}