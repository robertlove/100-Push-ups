import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})

export class CountdownComponent {

  @ViewChild('canvas') canvasElement : ElementRef;

  @Input('background-color') backgroundColor: string = 'transparent';

  @Input('background-line-color') backgroundLineColor: string = 'rgba(72, 138, 255, 0.4)';

  @Input('font-color') fontColor: string = 'black';

  @Input('font-family') fontFamily: string = '"Roboto", "Helvetica Neue", sans-serif';

  @Input('font-size') fontSize: number = 30;

  @Input('font-style') fontStyle: string = 'normal';

  @Input('font-variant') fontVariant: string = 'normal';

  @Input('font-weight') fontWeight: string = 'normal';

  @Input('fps') fps: number = 60;

  @Input('height') height: number = 250;

  @Input('line-cap') lineCap: string = 'round';

  @Input('line-color') lineColor: string = '#488aff';

  @Input('line-width') lineWidth: number = 15;

  @Input('seconds') seconds: number = 60;

  @Input('width') width: number = 250;

  @Output() cancelled: EventEmitter<any> = new EventEmitter();

  @Output() finished: EventEmitter<any> = new EventEmitter();

  @Output() paused: EventEmitter<any> = new EventEmitter();

  @Output() resumed: EventEmitter<any> = new EventEmitter();

  @Output() started: EventEmitter<any> = new EventEmitter();

  private canvas: any;

  private context: any;

  private delay: number;

  private eAngle: number = 1.5;

  private fontSizeAsPx: number;

  private fpsMax: number = 60;

  private fpsMin: number = 1;

  private interval: any;

  private intervalCount: number = 0;

  private intervalsRemaining: number;

  private isCancelled: boolean = false;

  private isFinished: boolean = false;

  private isPaused: boolean = false;

  private isResumed: boolean = false;

  private isRunning: boolean = false;

  private isStarted: boolean = false;

  private r: number;

  private sAngle: number = 3.5;

  private secondsDefault: number = 60;

  private secondsRemaining: number;

  private size: number;

  private textBaseline: string = 'middle';

  private textAlign: string = 'center';

  private x: number;

  private y: number;

  constructor() {}

  ngAfterViewInit(): void {
    this.init();
  }

  cancel(): void {
    clearInterval(this.interval);
    this.isCancelled = true;
    this.isFinished = false;
    this.isPaused = false;
    this.isResumed = false;
    this.isRunning = false;
    this.isStarted = false;
    this.init();
    this.cancelled.emit(this);
  }

  pause(): void {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isCancelled = false;
      this.isFinished = false;
      this.isPaused = true;
      this.isResumed = false;
      this.isRunning = false;
      this.isStarted = true;
      this.paused.emit(this);
    }
  }

  resume(): void {
    if (!this.isRunning) {
      this.isCancelled = false;
      this.isFinished = false;
      this.isPaused = false;
      this.isResumed = true;
      this.isRunning = true;
      this.isStarted = true;
      this.run();
      this.resumed.emit(this);
    }
  }

  start(): void {
    if (!this.isRunning) {
      this.isCancelled = false;
      this.isFinished = false;
      this.isPaused = false;
      this.isResumed = false;
      this.isRunning = true;
      this.isStarted = true;
      this.run();
      this.started.emit(this);
    }
  }

  private draw(): void {

    let eAngle = ((2 / this.seconds) * (this.intervalCount / this.fps)) + this.eAngle;

    this.context.clearRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, this.eAngle * Math.PI, true);
    this.context.fillStyle = this.backgroundColor;
    this.context.fill();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, this.eAngle * Math.PI, true);
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.backgroundLineColor;
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, this.sAngle * Math.PI, eAngle * Math.PI, true);
    this.context.lineCap = this.lineCap;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.lineColor;
    this.context.stroke();

    this.context.font = `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${this.fontSizeAsPx}px ${this.fontFamily}`;
    this.context.textBaseline = this.textBaseline;
    this.context.textAlign = this.textAlign;
    this.context.fillStyle = this.fontColor;
    this.context.fillText(this.secondsRemaining, this.x, this.y);

  }

  private init(): void {

    if (isNaN(this.seconds) || this.seconds <= 0) {
      this.seconds = this.secondsDefault;
    }

    if (isNaN(this.fps)) {
      this.fps = this.fpsMax;
    }

    if (this.fps < this.fpsMin) {
      this.fps = this.fpsMin;
    }

    if (this.fps > this.fpsMax) {
      this.fps = this.fpsMax;
    }

    this.intervalCount = 0;
    this.delay = 1000 / this.fps;
    this.intervalsRemaining = this.fps * this.seconds;
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
      this.intervalsRemaining--;
      this.intervalCount++;
      this.secondsRemaining = Math.ceil(this.intervalsRemaining / this.fps);
      this.draw();
      if (this.intervalsRemaining == 0) {
        clearInterval(this.interval);
        this.isFinished = true;
        this.finished.emit(this);
      }
    }, this.delay);
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
