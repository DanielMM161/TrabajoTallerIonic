import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { clientes } from '../../models/clientes';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  //Variable para inicializar mi formGroup(conjunto de FormControls)
  formGroup: FormGroup;

  user: clientes = 
    {
      nif: '',
      name: '',
      phone: '',
      address: '',
      email: ''
    };

    //Estos son los mensajes de error que saldran si el usuario inserta un dato incorrecto,
    //Dependiendo del dato mal introducido saltara un mensaje u otro.
    validation_messages = {
      'name': [
          { type: 'required', message: 'El Nombre es obligatorio.' },
          { type: 'minlength', message: 'El nombre tiene que tener mas de 10 caracteres.' },
          { type: 'maxlength', message: 'El nombre no puede tener mas de 30 caracteres.' },
        ],
        'nif': [         
          { type: 'maxlength', message: 'Nif no puede tener mas de 9 caracteres.' },
          { type: 'minlength', message: 'Nif tiene que tener 9 caracteres.' },
          { type: 'required', message: 'El Nif es un dato Obligatorio.' }
        ],
        'phone': [
          { type: 'required', message: 'Introduzca un número de telefono.' },
          { type: 'minlength', message: 'Un número de telefono contiene 9 digitos.' },
          { type: 'maxlength', message: 'Un número de telefono no tiene más de 9 digitos.' },
          { type: 'pattern', message: 'Solo introduzca números' },
        ],
        'address': [
          { type: 'required', message: 'Introduzca una direccion.' }
        ],
        'email': [
          { type: 'required', message: 'Introduzca un email.' },
          { type: 'pattern', message: 'Introduzca un email valido' }
        ],
      };

  clientesConstantes: Constantes[] =[
    {
      type: 'text',
      name: 'nif',
      placeholder: 'Nif',
      title: 'Nif'
    },
    {
      type: 'text',
      name: 'name',
      placeholder: 'Nombre',
      title: 'Nombre'
    },
    {
      type: 'text',
      name: 'phone',
      placeholder: 'Telefono',
      title: 'Telefono'

    },
    {
      type: 'text',
      name: 'address',
      placeholder: 'C/',
      title: 'Calle'

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
 
  //Dentro del constructor inicializo mi FormGroup(es un conjunto de form Control) y le aplico ciertos
  //parametros para validar
  constructor(private route: ActivatedRoute, 
    private nav: NavController, private todoService: FireService,
     private loadingController: LoadingController,
     private formBuilder: FormBuilder) {
      this.formGroup =  this.formBuilder.group({
        nif: new FormControl('',Validators.compose([
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.required
        ])),
        name: new FormControl('',Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(10),
          Validators.required
        ])),
        phone: new FormControl('',Validators.compose([
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.required
        ])),
        address: new FormControl('',Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(30),
          Validators.required
        ])),
        email: new FormControl('',Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
      });
      }

  ngOnInit() {

  }

  async saveTodo(event) {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.user.nif) {
      this.todoService.updateTodo(this.user, this.user.nif).then(() => {
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
