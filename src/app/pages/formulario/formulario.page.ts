import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { clientes } from '../../models/clientes.interface';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  user: clientes = 
    {
      id: '',
      name: '',
      calle: '',
      cp: '',
      nif: '',
      email: ''
    };



  clientes: Constantes[] =[
    {
      type: 'text',
      name: 'nombre',
      placeholder: 'Nombre',
      title: 'Nombre'
    },
    {
      type: 'text',
      name: 'calle',
      placeholder: 'C/',
      title: 'Calle'

    },
    {
      type: 'text',
      name: 'cP',
      placeholder: 'Codigo Postal',
      title: 'Codigo Postal'

    },
    {
      type: 'text',
      name: 'nif',
      placeholder: 'Nif',
      title: 'Nif'

    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      title: 'Email'
    }
  ];

  constantesVehiculos: Constantes[] =[

    {
      type: 'text',
      name: 'matricula',
      placeholder: 'Matricula',
      title: 'Matricula'
    },
    {
      type: 'text',
      name: 'Marca',
      placeholder: 'Seat',
      title: 'Marca'

    },
    {
      type: 'text',
      name: 'modelo',
      placeholder: 'Cordoba',
      title: 'Modelo'

    },
    {
      type: 'text',
      name: 'klmtr',
      placeholder: 'Kilometros',
      title: 'Kilometros'

    },
    {
      type: 'text',
      name: 'color',
      placeholder: 'Color',
      title: 'Color'
    },
    {
      type: 'text',
      name: 'anyos',
      placeholder: 'Años',
      title: 'Años'
    }
  ];
 
  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: FireService, private loadingController: LoadingController) { }

  ngOnInit() {

  }

  async saveTodo(event) {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.user.id) {
      this.todoService.updateTodo(this.user, this.user.id).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/login');
      });
    } else {
      this.todoService.addTodo(this.user).then(() => {
        console.log(event);
        loading.dismiss();
        this.nav.navigateForward('/login');
      });
    }
  }

}

interface Constantes{
  type: string;
  name: string;
  placeholder: string;
  title: string;
}
