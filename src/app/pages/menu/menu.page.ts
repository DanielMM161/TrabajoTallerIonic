import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router} from '@angular/router'
import { Incidence } from 'src/app/models/incidence';
import { Observable } from 'rxjs';
import { IncidenceService } from 'src/app/services/incidence.service';
import { DamagesService } from '../../services/damages.service';
import { refreshDescendantViews, containerRefreshStart } from '@angular/core/src/render3/instructions';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public incidenceArray = [];

  constructor(public AfAuth: AuthService, 
    private router: Router, 
    private incidenceService: IncidenceService,
    private damagesService: DamagesService,
    private detailsService: DetailsService) { }

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

  /**
   * Metodo que se ejecuta cuando se pulsa un elemento de la lista de incidencias
   * @param inc 
   */
  goIncident(inc: Incidence) {
    switch (inc.state) {
      case 'drawImage':
          this.damagesService.setIncidence(inc);
          this.router.navigate(['/drawimage']);
        break;

      case 'damageList':
          this.damagesService.setIncidence(inc);
          this.damagesService.setViewDamageList(true);
          this.router.navigate(['/damagelist']);
        break;

      case 'drawImage':

        break;
    }

  }

  deleteIncidence(inc: Incidence){
    this.incidenceService.deleteIncidence(inc.idInc);
    this.detailsService.deleteDetails(inc.idInc);
  }

}
