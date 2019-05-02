import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { clientes } from '../../models/clientes';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Vehicles } from '../../models/vehicles';
import { VehiclesService } from '../../services/vehicles.service';
import { DataService } from '../../services/data.service';
import { Constants } from 'src/app/interfaces/Constants';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  // Variable para inicializar mi formGroup(conjunto de FormControls)
  formGroupCustomers: FormGroup;

  formGroupVehicles: FormGroup;

  user: clientes =
    {
      nif: '',
      name: '',
      phone: '',
      address: '',
      email: ''
    };

  vehicles: Vehicles =
  {
    enrollment: '',
    brand: '',
    model: '',
    kilometers: '',
    color: '',
    age: ''
  };

    /*Estos son los mensajes de error que saldran si el usuario inserta un dato incorrecto,
      Dependiendo del dato mal introducido saltara un mensaje u otro.*/
  validation_messages_customers = {
    'name': [
        { type: 'required', message: 'El Nombre es un dato obligatorio.' },
        { type: 'pattern', message: 'Tienes que introducir nombre y apellidos' }
      ],
        'nif': [
          { type: 'pattern', message: 'El Nif son 8 números y 1 letra' },
          { type: 'required', message: 'El Nif es un dato Obligatorio.' }
        ],
        'phone': [
          { type: 'required', message: 'Introduzca un número de telefono.' },
          { type: 'pattern', message: 'Un número de telefono tiene 9 digitos y empieza por 9,6 o 7s' }
        ],
        'address': [
          { type: 'required', message: 'Introduzca una direccion.' }
        ],
        'email': [
          { type: 'required', message: 'Introduzca un email.' },
          { type: 'pattern', message: 'Introduzca un email valido' }
        ]
      };

  validation_messages_vehicles = {
        'enrollment': [
            { type: 'required', message: 'Introduce la matricula.' },
            { type: 'pattern', message: 'Introduzca una matricula correcta' }
          ],
          'brand': [
            { type: 'required', message: 'Introduce la marca del coche' },
            { type: 'pattern', message: 'Introduce la marca' },
          ],
          'model': [
            { type: 'required', message: 'Introduce el modelo del coche' },
            { type: 'pattern', message: 'Introduce un número de teléfono correcto' }
          ],
          'kilometers': [
            { type: 'required', message: 'Introduce los kilometros.' },
            { type: 'pattern', message: 'Solo números' }
          ],
          'color': [
            { type: 'required', message: 'Introduce el color' }
          ],
          'age': [
            { type: 'required', message: 'Introduce el año del coche' },
            { type: 'pattern', message: 'Solo números de dos cifras' }
          ]
      };

  // En estas dos dos variables cargo los datos del json
  constantCustomers: Observable<Constants[]>;
  constantVehicles: Observable<Constants[]>;

  /*Dentro del constructor inicializo mi FormGroup(es un conjunto de form Control) y le aplico ciertos
  parametros para validar*/
  constructor(private route: ActivatedRoute,
    private nav: NavController, private todoService: FireService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService,
    private dataServie: DataService) {
      this.buildFormGroupCustomers();
      this.buildFormGroupVehicles();
    }

  /**
   * Metodo en el cual creo mi FormGroup de clientes
   */
  buildFormGroupCustomers() {
    this.formGroupCustomers =  this.formBuilder.group({
      nif: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[9|6|7][0-9]{8}$')
      ])),
      address: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(30),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    }, { updateOn: 'blur' });
  }

  /**
   * Metodo en el cual creo mi FormGroup de vehiculos
   */
  buildFormGroupVehicles() {
    this.formGroupVehicles =  this.formBuilder.group({
      enrollment: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\d{4}[A-Z]{3}$')
      ])),
      brand: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      model: new FormControl('', Validators.compose([
        Validators.required
      ])),
      kilometers: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('') // falta expresion regular
      ])),
      color: new FormControl('', Validators.compose([
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,2}$')
      ])),
    }, { updateOn: 'blur' });
  }

  ngOnInit() {
    /*Recojo los datos del json y los guardo en estas variables*/
    this.constantVehicles = this.dataServie.getConstantVehicles();
    this.constantCustomers = this.dataServie.getConstantCustomers();
  }

  async saveTodo(event) {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });

    await loading.present();

      // Save the customers
      this.todoService.addTodo(this.user).then(() => {
        console.log(event);
        loading.dismiss();
        this.nav.navigateForward('/login');
      });
      // Save the vehicles of the customers
      this.vehicleService.addVehicles(this.vehicles).then(() => {
        console.log(event);
        loading.dismiss();
        this.nav.navigateForward('/login');
      });
    }

}
