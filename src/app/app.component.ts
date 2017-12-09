import { Component } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any = HomePage;

  constructor(private menuCtrl: MenuController, platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  clear(): void {
    this.storage.clear().then(() => {
      this.goToHomePage();
    });
  }

  goToHomePage(): void {
    this.menuCtrl.close().then(() => {
      this.rootPage = HomePage;
    });
  }

}
