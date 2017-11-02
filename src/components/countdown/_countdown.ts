import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})

export class CountdownComponent {

  @ViewChild('canvas') canvasElement : ElementRef;

  @Input('font-family') fontFamily: string = '"Roboto", "Helvetica Neue", sans-serif';

  @Input('font-size') fontSize: number = 30;

  @Input('font-style') fontStyle: string = 'normal';

  @Input('font-variant') fontVariant: string = 'normal';

  @Input('font-weight') fontWeight: string = 'normal';

  @Input('height') height: number = 300;

  @Input('line-cap') lineCap: string = 'round';

  @Input('line-width') lineWidth: number = 30;

  @Input('seconds') seconds: number = 60;

  @Input('width') width: number = 300;

  @Output() cancelled: EventEmitter<any> = new EventEmitter();

  @Output() finished: EventEmitter<any> = new EventEmitter();

  @Output() paused: EventEmitter<any> = new EventEmitter();

  @Output() resumed: EventEmitter<any> = new EventEmitter();

  @Output() started: EventEmitter<any> = new EventEmitter();

  private canvas: any;

  private context: any;

  private count: number = 0;

  private eAngle: number = 1.5;

  private fontSizeAsPx: number;

  private interval: any;

  private isCancelled: boolean = false;

  private isFinished: boolean = false;

  private isPaused: boolean = false;

  private isResumed: boolean = false;

  private isRunning: boolean = false;

  private isStarted: boolean = false;

  private r: number = 135;

  private sAngle: number = 3.5;

  private secondsRemaining: number;

  private size: number = 300;

  private x: number = 150;

  private y: number = 150;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
  }

  cancel(): void {
    this.cancelled.emit(this);
    clearInterval(this.interval);
    this.init();
  }

  pause(): void {
    if (this.isRunning) {
      this.paused.emit(this);
      clearInterval(this.interval);
      this.isPaused = true;
      this.isResumed = false;
      this.isRunning = false;
    }
  }

  resume(): void {
    if (!this.isRunning) {
      this.resumed.emit(this);
      this.run();
      this.isPaused = false;
      this.isResumed = true;
      this.isRunning = true;
    }
  }

  start(): void {
    if (!this.isRunning) {
      this.started.emit(this);
      this.run();
      this.isPaused = false;
      this.isRunning = true;
      this.isStarted = true;
    }
  }

  private draw(): void {

    let eAngle = ((2 / this.seconds) * this.count) + this.eAngle;

    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, this.eAngle * Math.PI, true);
    this.context.fillStyle = '#fff';
    this.context.fill();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, this.eAngle * Math.PI, true);
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = '#f4f4f4';
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, eAngle * Math.PI, true);
    this.context.lineCap = this.lineCap;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = '#488aff';
    this.context.stroke();

    this.context.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSizeAsPx}px ${this.fontFamily}`;
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
    this.context.fillStyle = '#000';
    this.context.fillText(this.secondsRemaining, this.x, this.y);

  }

  private init(): void {
    this.isCancelled = false;
    this.isFinished = false;
    this.isPaused = false;
    this.isResumed = false;
    this.isRunning = false;
    this.isStarted = false;

    this.count = 0;
    this.secondsRemaining = this.seconds;

    this.size = Math.min(this.height, this.width);
    this.fontSizeAsPx = this.fontSize / 100 * this.size;
    this.r = this.size / 2 - this.lineWidth / 2;
    this.x = this.width / 2;
    this.y = this.height / 2;

    this.setCanvas();
    this.setContext();
    this.draw();
  }

  private run(): void {
    this.interval = setInterval(() => {
      this.secondsRemaining--;
      this.count++;
      this.draw();
      if (this.secondsRemaining == 0) {
        this.finished.emit(this);
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private setCanvas(): void {
    this.canvas = this.canvasElement.nativeElement;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private setContext(): void {
    this.context = this.canvas.getContext('2d');
  }

}
