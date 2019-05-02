import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;

  constructor(public platform: Platform, public renderer: Renderer){

  }

  ngAfterViewInit(){

    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    
    this.renderer.setElementAttribute(this.canvasElement, 'width', '895');
    this.renderer.setElementAttribute(this.canvasElement, 'height', "648");
    this.canvasElement.style.background = "url(../../assets/img/coche.png)";
    this.canvasElement.style.backgroundRepeat = "no-repeat";
  }

  handleStart( ev ){
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  handleMove( ev ){

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
    
  }

  handleEnd( ev ){
    
  }
}
