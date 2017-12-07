import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SessionPage } from '../../pages/session/session';
import { TestPage } from '../../pages/test/test';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  constructor(private navCtrl: NavController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  submit(): any {

    this.storage.get('progress').then((progress) => {

      console.log('HomePage.submit progress', progress);

      let weekAndDay = {
        weekAndDay: null
      };

      if (progress !== null) {
        let weekAndDay = {
          weekAndDay: `$(progress.week)$(progress.day)`
        };
      }

      console.log('HomePage.submit weekAndDay', weekAndDay);

      switch (weekAndDay.weekAndDay) {
        case null:
        case '23':
        case '43':
        case '53':
        case '63':
          this.navCtrl.push(TestPage, weekAndDay);
          break;
        default:
          this.navCtrl.push(SessionPage, progress);
          break;
      }

    });

  }

}
