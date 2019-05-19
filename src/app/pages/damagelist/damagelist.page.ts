import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DamagesService } from 'src/app/services/damages.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-damagelist',
  templateUrl: './damagelist.page.html',
  styleUrls: ['./damagelist.page.scss'],
})
export class DamagelistPage implements OnInit {

  damages = [];
  internDamage = [];

  public count = 0;
  public myForm: FormGroup;

  constructor(public damageService: DamagesService, 
    private formBuilder: FormBuilder, 
    private route: Router) { 
    this.myForm = formBuilder.group({

    });
  }

  ngOnInit() {
    /**Compruebo el booleano de damageServices ya que si esta a true significa que 
     * hemos accedido seleccionando el item del menu y si esta a false es que se ha accedido
     * desde la vista drawImage al darle a continuar.
     */
    this.damages = [];
    this.internDamage = [];
    if (this.damageService.getViewDamageList) {
      this.damageService.getDetailDB(this.damageService.incidence.idInc).subscribe( (damSnapshot) => {
        this.damageService.details.id = damSnapshot.payload.get('id');
        this.damageService.details.idIncidence = damSnapshot.payload.get('idIncidence');
        this.damageService.details.damages = damSnapshot.payload.get('damages');
        this.damageService.details.internDamages = damSnapshot.payload.get('internDamages');

        this.damages = damSnapshot.payload.get('damages');
        this.internDamage = damSnapshot.payload.get('internDamages');
      });
    } else {
      this.damages = this.damageService.getDamages();
    }
  }

  addControl(){
    if(this.damages.length < 10){
      this.myForm.addControl('0'+(this.internDamage.length), new FormControl('', Validators.required));
    }else{
      this.myForm.addControl(String(this.internDamage.length), new FormControl('', Validators.required));
    }    

    console.log(this.internDamage);
  }

  removeControl(control){
    this.myForm.removeControl(control.key);
    this.internDamage.splice(parseInt(control.key), 1);
  }

  goSummary( ){
    this.addInternalDamages();
    this.damageService.setDamages(this.damages.concat(this.internDamage));
    this.route.navigate(['/summary']);
    console.log(this.damages);
  }

  addInternalDamages() {
    this.damageService.details.internDamages = this.internDamage;
    this.damageService.updateInterDamages(this.damageService.details);
  }

}
