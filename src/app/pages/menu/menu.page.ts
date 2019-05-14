import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router} from '@angular/router'
import { Incidence } from 'src/app/models/incidence';
import { Observable } from 'rxjs';
import { IncidenceService } from 'src/app/services/incidence.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public incidenceArray = [];

  constructor(public AfAuth: AuthService, private router: Router, private incidenceService: IncidenceService) { }

  ngOnInit( ) {
    this.incidenceService.getAllIncidence().subscribe(data => {
      this.incidenceArray = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      })
    });
  }

  public OnLogOut(){
    this.AfAuth.logout();
  }

  public IrForm() {
    this.router.navigate(['/formulario']);
  }

  public IrDraw() {
    this.router.navigate(['/drawimage']);
  }

}
