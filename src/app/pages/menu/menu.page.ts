import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(public AfAuth: AuthService) { }

  ngOnInit() {
  }

  public OnLogOut(){
    this.AfAuth.logout();
  }

}
