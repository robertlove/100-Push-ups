import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CountdownComponent } from '../../components/countdown/countdown';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(CountdownComponent) countdownComponent: CountdownComponent

  constructor(public navCtrl: NavController) {}

  countdownCancel(): void {
    this.countdownComponent.cancel();
  }

  countdownPause(): void {
    this.countdownComponent.pause();
  }

  countdownResume(): void {
    this.countdownComponent.resume();
  }

  countdownStart(): void {
    this.countdownComponent.start();
  }

}
