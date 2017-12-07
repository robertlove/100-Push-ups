import { Component } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any = HomePage;

  constructor(private menuCtrl: MenuController, platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToHomePage(): void {
    this.menuCtrl.close().then(() => {
      this.rootPage = HomePage;
    });
  }

  goToTestPage(): void {
    this.menuCtrl.close().then(() => {
      this.rootPage = TestPage;
    });
  }
}
