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

  public incidents: Observable<Incidence[]>;

  constructor(public AfAuth: AuthService, private router: Router, private incidenceService: IncidenceService) { }

  ngOnInit( ) {
    this.incidents = this.incidenceService.getIncidents();
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
