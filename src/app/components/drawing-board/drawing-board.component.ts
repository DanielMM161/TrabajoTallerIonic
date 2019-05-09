import { Component, ViewChild, EventEmitter, Output, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  offsetX: any;
  offsetY: any;
  startX: any;
  startY: any;
  endX: any;
  endY: any;
  isDown = false;
  ctx: any;
  public myForm: FormGroup;
  public playerCount: number = 0;
  @Output() public averiasEmmit = new EventEmitter();
  public averias = [];

  

  constructor( private formBuilder: FormBuilder ){

    console.log(this.canvas);

    this.myForm = formBuilder.group({

    });
  }

  

  drawOval(x, y) {
    
    //this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    //this.ctx.clearRect(x, y, this.startX, y, this.startX, this.startY + (y - this.startY) / 2);
    
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 8;
    this.ctx.moveTo(this.startX, this.startY + (y - this.startY) / 2);
    this.ctx.bezierCurveTo(this.startX, this.startY, x, this.startY, x, this.startY + (y - this.startY) / 2);
    this.ctx.bezierCurveTo(x, y, this.startX, y, this.startX, this.startY + (y - this.startY) / 2);
    this.ctx.closePath();  
      
     
    
  }

  ngAfterViewInit(){

    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.style.background = "url(../../assets/img/coche.png)";
    this.canvasElement.style.backgroundRepeat = "no-repeat";
    this.canvasElement.style.backgroundSize = "100% 100%";
    this.canvasElement.width = document.body.clientWidth - 6;


    this.offsetX = this.canvasElement.offsetLeft;
    this.offsetY = this.canvasElement.offsetTop;

    this.ctx = this.canvasElement.getContext('2d');
  }

  handleStart( ev ){

    ev.preventDefault();
    ev.stopPropagation();

    this.startX = ev.touches[0].clientX - this.offsetX;
    this.startY = ev.touches[0].clientY - this.offsetY;

    this.isDown = true;
    console.log(ev.touches[0].clientX + " " + ev.touches[0].clientY);
  }

  handleMove( ev ){

    if (!this.isDown) {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();
    let mouseX = ev.touches[0].clientX - this.offsetX;
    this.endX = mouseX;    
    let mouseY = ev.touches[0].clientY - this.offsetY;
    this.endY = mouseY;
    this.drawOval(mouseX, mouseY);
  }

  handleEnd( ev ){
    if (!this.isDown) {
      return;
    }

    ev.preventDefault();
    ev.stopPropagation();
    this.isDown = false;  
    this.ctx.stroke(); 
    this.ctx.font = "30px sans-serif";
    this.ctx.fillStyle = "#FF0000";
    //this.ctx.fillText(this.playerCount +1, this.startX, this.startY);
    // center of oval
    
    this.ctx.fillText(this.playerCount+1, (this.startX + (this.endX - this.startX) / 2)-4, (this.startY + (this.endY - this.startY) / 2)+4);
    this.addControl();
    
  }

  clearAll(){
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.myForm = this.formBuilder.group({ });
    this.playerCount = 0;
    this.averias = [];
    this.averiasEmmit.emit(this.averias);
  }

  addControl(){
    this.playerCount++;
    this.myForm.addControl('averia' + this.playerCount, new FormControl('', Validators.required));
    this.averiasEmmit.emit(this.averias);
  }

  removeControl(control){
    this.myForm.removeControl(control.key);
    this.averias.splice(control.key, 1);
    this.averiasEmmit.emit(this.averias);
  }
}
