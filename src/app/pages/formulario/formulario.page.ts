import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from '../../services/fire.service';
import { clientes } from '../../models/clientes';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder, NgControlStatus } from '@angular/forms';
import { Vehicles } from '../../models/vehicles';
import { VehiclesService } from '../../services/vehicles.service';
import { DataService } from '../../services/data.service';
import { Constants } from 'src/app/interfaces/Constants';
import { Observable } from 'rxjs';
import { IncidenceService } from '../../services/incidence.service';
import { Incidence } from '../../models/incidence';
import { DamagesService } from '../../services/damages.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  /* Atributos de la clase */
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

  auxUser: clientes = {
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

  auxVehicles: Vehicles =
  {
    enrollment: '',
    brand: '',
    model: '',
    kilometers: '',
    color: '',
    age: ''
  };

  incidence: Incidence = {
     id: '',
     idCar: '',
     state: '',
  };

    /*Estos son los mensajes de error que saldran si el usuario inserta un dato incorrecto,
      Dependiendo del dato mal introducido saltara un mensaje u otro.*/
  validation_messages_customers = {
    'name': [
        { type: 'required', message: 'El Nombre es un dato obligatorio.' },
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

  constantCustomers: Observable<Constants[]>;

  constantVehicles: Observable<Constants[]>;

  constantMessagesErrors: Observable<Object>;


  /*Dentro del constructor inicializo mi FormGroup(es un conjunto de form Control) y le aplico ciertos
  parametros para validar*/
  constructor(private route: ActivatedRoute,
    private nav: NavController, 
    private todoService: FireService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService,
    private dataServie: DataService,
    public alertController: AlertController,
    public incidenceService: IncidenceService,
    public damagesService: DamagesService) {
      this.buildFormGroupCustomers();
      this.buildFormGroupVehicles();
  }

  ngOnInit() {
    /*Recojo los datos del json y los guardo en estas variables*/
    this.constantVehicles = this.dataServie.getConstantVehicles();
    this.constantCustomers = this.dataServie.getConstantCustomers();

    //COMPROBAR BIEN DATOS - JSON ERROR MESSAGE
    //this.constantMessagesErrors = this.dataServie.getValidationMessageCustomers();
    this.getSizeIncidents();
  }

  public getErrorCustomers(controlName: string): string {
    let error = '';
    const control = this.formGroupCustomers.get(controlName);

    switch (controlName) {
      case 'nif': {
          this.validation_messages_customers.nif.forEach( res => {
            if (control.hasError(res.type)) {
                error = res.message;
            }
          });
        break;
      }
      case 'name': {
        this.validation_messages_customers.name.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'phone': {
        this.validation_messages_customers.phone.forEach( res => {
          if (control.hasError(res.type) ) {
              error = res.message;
          }
        });
        break;
      }
      case 'address': {
        this.validation_messages_customers.address.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'email': {
        this.validation_messages_customers.email.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
    }
    return error;
  }

  public getErrorVehicles(controlName: string): string {
    let error = '';
    const control = this.formGroupVehicles.get(controlName);

    switch (controlName) {
      case 'enrollment': {
        this.validation_messages_vehicles.enrollment.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
            }
          });
        break;
      }
      case 'brand': {
        this.validation_messages_vehicles.brand.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'model': {
        this.validation_messages_vehicles.model.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'kilometers': {
        this.validation_messages_vehicles.kilometers.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'color': {
        this.validation_messages_vehicles.age.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
      case 'age': {
        this.validation_messages_vehicles.age.forEach( res => {
          if (control.hasError(res.type)) {
              error = res.message;
          }
        });
        break;
      }
    }
    return error;
  }

  async checkDataUser() {

    //this.compareDatesCustomers();
    if (this.compareDatesCustomers() || this.compareDatesVehicles()) {
      const alert = await this.alertController.create({
        header: 'Actualizar Datos',
        message: 'Los datos del usuario o vehiculo han cambiado, si aceptas se actualizaran dichos datos',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            cssClass: 'secondary',
            handler: (blah) => {

            }
          }, {
            text: 'Aceptar',
            role: 'aceptar',
            cssClass: 'primary',
            handler: () => {
              this.updateDates();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  compareDatesCustomers(): Boolean {
    let diferent: Boolean;
    //Si son diferententes se le asigna un true afirmando que se cambiaron datos
    if (this.auxUser.phone !== this.user.phone) {
      diferent = true;
    } else if (this. auxUser.email !== this.user.email) {
      diferent = true;
    } else if (this.auxUser.address !== this.user.address) {
      diferent = true;
    } else {
      diferent = false;
    }
    return diferent;
  }

  compareDatesVehicles(): Boolean {
    let diferent: Boolean;
    if (this.auxVehicles.enrollment !== this.vehicles.enrollment) {
      diferent = true;
    } else if (this.auxVehicles.brand !== this.vehicles.brand) {
      diferent = true;
    } else if (this.auxVehicles.model !== this.vehicles.model) {
      diferent = true;
    } else if (this.auxVehicles.kilometers !== this.vehicles.kilometers) {
      diferent = true;
    } else if (this.auxVehicles.color !== this.vehicles.color) {
      diferent = true;
    } else if (this.auxVehicles.age !== this.vehicles.age) {
      diferent = true;
    } else {
      diferent = false;
    }

    return diferent;
  }

  checkNif(nif: string) {
    this.todoService.checkNif(nif, this.user, this.auxUser);
  }

  checkEnrollment(enrollment: string) {
    this.vehicleService.checkEnrollment(enrollment, this.vehicles,this.auxVehicles);
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
        Validators.required
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

  public getSizeIncidents() {
    this.incidenceService.getIncidenceService().collection('incidents').get().toPromise().then((res) => {
      const size = res.size + 1;
      this.incidence.id = size.toString();
        console.log(this.incidence.id);
      })
      .catch(err => {
      console.log(err)});
  }

  async saveTodo(event) {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });

    await loading.present();

      // Save the vehicles of the customers
      this.vehicleService.addVehicles(this.vehicles).then(() => {
        this.todoService.addTodo(this.user);
        this.addIncidence();
        //Guardo en el servicio la incidencia del id
        this.damagesService.setId(this.incidence.id);
        console.log(event);
        loading.dismiss();
        this.nav.navigateForward('/drawimage');
      });
    }

  async addIncidence () {
    this.incidence.idCar = this.vehicles.enrollment;
    this.incidence.state = 'peritando';

    this.incidenceService.addIncidence(this.incidence);
  }

  async updateDates() {
      const loading = await this.loadingController.create({
        message: 'Actualizando....'
      });
      await loading.present();
      this.todoService.updateTodo(this.user).then(() => {
      this.vehicleService.updateVehicles(this.vehicles);
      //Guardo en el servicio la incidencia del id
        this.damagesService.setId(this.incidence.id);
        loading.dismiss();
        this.nav.navigateForward('/drawimage');
      });
    }

}

