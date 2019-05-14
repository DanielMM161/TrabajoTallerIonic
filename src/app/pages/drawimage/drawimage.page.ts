import { Component, OnInit, ViewChild } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawimage',
  templateUrl: './drawimage.page.html',
  styleUrls: ['./drawimage.page.scss'],
})
export class DrawimagePage implements OnInit {

  idDamage: string;
  averias = [];  
  canvas;

  constructor(public damageService: DamagesService, public route: Router){ }

  ngOnInit(): void {

    this.idDamage = this.damageService.getId();
  }

  recogeArray(event){
    this.averias = event;
    console.log(this.averias);
  }

  recogeCanvas(event){
    this.canvas = event;
    console.log(this.canvas);
  }
  

  goDamageList( ){
    this.damageService.setDamages(this.averias);
    this.saveCanvasImage();
    this.route.navigate(['/damagelist']);
  }

  saveCanvasImage(){
    var dataUrl = this.canvas.nativeElement.getDataURL();
    console.log(dataUrl);
  }
  

}