import { Component, OnInit, ViewChild } from '@angular/core';
import { DamagesService } from 'src/app/services/damages.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drawimage',
  templateUrl: './drawimage.page.html',
  styleUrls: ['./drawimage.page.scss'],
})
export class DrawimagePage implements OnInit {

  idDamage: string;

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  startX: any;
  startY: any;
  isDown = false;
  ctx: any;
  public myForm: FormGroup;
  public averias = [];
  public touches = [];
  downloadURL: Observable<any>;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;


  constructor(private formBuilder: FormBuilder,
    public damageService: DamagesService,
    public route: Router,
    private storageAng: AngularFireStorage) {

    this.myForm = formBuilder.group({

    });
  }

  ngOnInit(): void {

    this.idDamage = this.damageService.getId();
  }

  ngAfterViewInit() {

    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.style.background = "url(../../assets/img/coche.png)";
    this.canvasElement.style.backgroundRepeat = "no-repeat";
    this.canvasElement.style.backgroundSize = "100% 100%";
    this.canvasElement.width = document.body.clientWidth - 6;
    this.canvasElement.height = (document.body.clientHeight * 3) / 7;
    this.ctx = this.canvasElement.getContext('2d');
    this.setBackgroundImage(this.ctx);
  }

  goDamageList() {
    this.damageService.setDamages(this.averias);
    this.saveCanvasImage();
    this.route.navigate(['/damagelist']);
  }

  async setBackgroundImage(context) {

    var background = new Image();
    background.src = "../../assets/img/cocheTemplate.png";
    background.onload = await function () {
      context.drawImage(background, 0, 0, document.body.clientWidth - 6, (document.body.clientHeight * 3) / 7);
    }

  }

  setNewBack(context) {
    var background = new Image();


    background.onload = function () {
      context.drawImage(background, 0, 0, document.body.clientWidth - 6, (document.body.clientHeight * 3) / 7);
    }
    background.src = "../../assets/img/coche.png";


  }

  saveCanvasImage() {
    let name = this.idDamage + '.png';

    var image = new Image();
    image.src = this.canvasElement.toDataURL("image/png");
    console.log(image);
    this.damageService.setImage(image);
    this.ref = this.storageAng.ref(name);
    this.task = this.storageAng.ref(name).putString(image.src, 'data_url');
    this.downloadURL = this.ref.getDownloadURL();
    console.log(this.downloadURL);
    console.log(this.storageAng);
  }

  handleStart(ev) {

    ev.preventDefault();
    ev.stopPropagation();

    this.startX = ev.touches[0].clientX - this.canvasElement.offsetLeft;
    this.startY = ev.touches[0].clientY - this.canvasElement.offsetTop;

    this.addControl();
    this.drawCircle(this.startX, this.startY, this.touches.length);


  }

  drawCircle(x, y, id?) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 40, 0, 2 * Math.PI);
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#FF0000";
    if (id != null) {
      if (id < 9) {
        this.ctx.fillText(id, x - 6, y + 6);
      } else {
        this.ctx.fillText(id, x - 15, y + 6);
      }
    } else {
      this.ctx.fillText(1, x - 6, y + 6);
    }



    this.ctx.closePath();

  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.myForm = this.formBuilder.group({});
    this.averias = [];
    this.touches = [];

    this.setBackgroundImage(this.ctx);
  }

  addControl() {

    if (this.touches.length == 0) {
      this.myForm.addControl(String(0), new FormControl('', Validators.required));
      this.touches.push({
        "id": 0,
        "x": this.startX,
        "y": this.startY,
        "form": 0
      });
    } else {
      this.myForm.addControl(String(this.touches[this.touches.length - 1].form + 1), new FormControl('', Validators.required));

      this.touches.push({
        "id": this.touches[this.touches.length - 1].id + 1,
        "x": this.startX,
        "y": this.startY,
        "form": this.touches[this.touches.length - 1].form + 1
      });
    }
    console.log(this.myForm);
    console.log(this.touches);
  }

  removeControl(control) {

    console.log(control);
    
    this.myForm.removeControl(control.key);

    for (let i = 0; i < this.touches.length; i++) {

      if (control.key == this.touches[i].form) {
        this.touches.splice(i, 1);
        this.averias.splice(i, 1);
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        i--;
      }
      else {
        this.touches[i].id = i;
      }
    }

    this.setBackgroundImage(this.ctx);

    setTimeout(() => {
      for (let i = 0; i < this.touches.length; i++) {
        this.drawCircle(this.touches[i].x, this.touches[i].y, i + 1);
      }
    }, 350);
    console.log('touches', this.touches)
    console.log('averias', this.averias)


  }

  checkValue(control: string): boolean {
    let number: number = parseInt(control);
    if (number >= (this.touches.length - 1)) {
      return true;
    } else {
      return false;
    }
  }

}
