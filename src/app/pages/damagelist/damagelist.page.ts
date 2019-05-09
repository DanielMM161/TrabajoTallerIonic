import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DamagesService } from 'src/app/services/damages.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-damagelist',
  templateUrl: './damagelist.page.html',
  styleUrls: ['./damagelist.page.scss'],
})
export class DamagelistPage implements OnInit {

  averias = [];
  public count = 0;
  public myForm: FormGroup;

  constructor(public damageService: DamagesService, private formBuilder: FormBuilder) { 
    this.myForm = formBuilder.group({

    });
  }

  ngOnInit() {
    this.averias = this.damageService.getDamages();

    console.log(this.averias);
  }

  addControl(){
    this.count++;
    this.myForm.addControl('averia' + this.count, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.myForm.removeControl(control.key);
  }

}
