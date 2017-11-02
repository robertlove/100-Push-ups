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

  onCountdownCancelled(countdown): void {
    console.log('Countdown Cancelled:', countdown);
  }

  onCountdownFinished(countdown): void {
    console.log('Countdown Finished:', countdown);
  }

  onCountdownPaused(countdown): void {
    console.log('Countdown Paused:', countdown);
  }

  onCountdownResumed(countdown): void {
    console.log('Countdown Resumed:', countdown);
  }

  onCountdownStarted(countdown): void {
    console.log('Countdown Started:', countdown);
  }

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
