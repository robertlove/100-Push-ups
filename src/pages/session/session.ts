import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { TimerComponent } from '../../components/timer/timer';
import { HomePage } from '../../pages/home/home';

@IonicPage()

@Component({
  selector: 'page-session',
  templateUrl: 'session.html',
})

export class SessionPage {

  day: number;

  level: number;

  progress: any;

  rest: number;

  sets: any;

  week: number;

  @ViewChild(Slides) slides: Slides;

  @ViewChildren(TimerComponent) timer: QueryList<TimerComponent>

  constructor(private navCtrl: NavController, private navParams: NavParams, private session: SessionProvider) {

    this.progress = {
      level: this.navParams.get('level'),
      week: this.navParams.get('week'),
      day: this.navParams.get('day')
    };

    this.session.get(this.progress).subscribe(
      data => {
        this.level = data[0].level;
        this.week = data[0].week;
        this.day = data[0].day;
        this.rest = data[0].rest;
        this.sets = data;
      }
    );

    console.log('SessionPage', this);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
  }

  isOdd(number) {
    return number % 2;
  }

  submit() {
    // If we're finished
    if (this.slides.isEnd()) {

      // Go to the home page
      this.navCtrl.popTo(HomePage);

    } else {

      // Else, go to the next slide
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);

      let slideIndex = this.slides.getActiveIndex();
      let timerIndex = Math.floor(slideIndex / 2);

      // If it's an odd number slide (timer slide)
      if (this.isOdd(slideIndex)) {
        // start the timer
        this.timer.toArray()[timerIndex].start();
      } else {
        // Else, we're on a workout slide
        if (timerIndex > 0) {
          // so cancel the previous timer
          this.timer.toArray()[timerIndex - 1].cancel();
        }
      }

    }
  }

  onTimerFinished(timer) {
    this.submit();
  }

}
