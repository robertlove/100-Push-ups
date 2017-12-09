import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { TimerComponent } from '../../components/timer/timer';
import { HomePage } from '../../pages/home/home';

@IonicPage()

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html',
})

export class SessionsPage {

  buttonText: string = 'Done';

  day: number;

  level: number;

  progress: any;

  sets: any;

  week: number;

  @ViewChild(Slides) slides: Slides;

  @ViewChildren(TimerComponent) timer: QueryList<TimerComponent>

  constructor(private navCtrl: NavController, private navParams: NavParams, private session: SessionProvider, private storage: Storage) {

    this.progress = {
      level: this.navParams.get('level'),
      week: this.navParams.get('week'),
      day: this.navParams.get('day')
    };

    this.session.find(this.progress).subscribe(
      data => {
        this.day = data[0].day;
        this.level = data[0].level;
        this.sets = data;
        this.week = data[0].week;
      }
    );

    console.log('SessionsPage', this);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionsPage');
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
  }

  isTimerSlide(slideIndex) {
    if (this.slides.isEnd()) {
      return false;
    }
    return slideIndex % 2;
  }

  submit() {

    // If we're on the last slide
    if (this.slides.isEnd()) {

      // Save progress
      this.storage.set('progress', this.progress);

      // Go home
      this.navCtrl.setRoot(HomePage, {}, {
        animate: true,
        direction: 'forward'
      });

    }

    // Go to the next slide
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);

    // Define the active slide index
    let slideIndex = this.slides.getActiveIndex();

    // If we're on the last slide
    if (slideIndex == this.slides.length() - 1) {
      this.buttonText = 'Finished';
      return;
    }

    // Define the timer index
    let timerIndex = Math.floor(slideIndex / 2);

    // If it's a timer slide
    if (this.isTimerSlide(slideIndex)) {
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

  onTimerFinished(timer) {
    this.submit();
  }

}
