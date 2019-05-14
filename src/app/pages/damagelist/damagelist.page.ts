import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DamagesService } from 'src/app/services/damages.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(public damageService: DamagesService, private formBuilder: FormBuilder, private route: Router) { 
    this.myForm = formBuilder.group({

    });
  }

  ngOnInit() {
    this.damages = this.damageService.getDamages();

    console.log(this.damages);
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
    this.damageService.setDamages(this.damages.concat(this.internDamage));
    this.route.navigate(['/summary']);
    console.log(this.damages);
  }

}
