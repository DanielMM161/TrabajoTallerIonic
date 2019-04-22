import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router} from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public AfAuth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public OnLogOut(){
    this.AfAuth.logout();
  }

  /**
   * IrForm
   */
  public IrForm() {
    this.router.navigate(['/formulario'])
  }

}
