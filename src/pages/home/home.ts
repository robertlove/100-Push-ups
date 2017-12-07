import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SessionPage } from '../../pages/session/session';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  constructor(private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToSessionPage(): void {
    this.navCtrl.push(SessionPage);
  }

}
