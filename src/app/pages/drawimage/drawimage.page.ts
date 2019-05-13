import { Component, OnInit, ViewChild } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawimage',
  templateUrl: './drawimage.page.html',
  styleUrls: ['./drawimage.page.scss'],
})
export class DrawimagePage implements OnInit {

  idDamage;
  averias = [];  

  constructor(public damageService: DamagesService, public route: Router){ }

  ngOnInit(): void {

    this.idDamage = this.damageService.getId();
    console.log(this.idDamage);    
    console.log('objeto', this.damageService);
  }

  recogeArray(event){
    this.averias = event;
    console.log(this.averias);
  }

  goDamageList( ){
    this.damageService.setDamages(this.averias);
    this.route.navigate(['/damagelist']);
  }

}