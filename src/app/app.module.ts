import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { SessionProvider } from '../providers/session/session';
import { TimerComponent } from '../components/timer/timer';
import { HomePage } from '../pages/home/home';
import { TestsPage } from '../pages/tests/tests';
import { SessionsPage } from '../pages/sessions/sessions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestsPage,
    SessionsPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestsPage,
    SessionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionProvider
  ]
})

export class AppModule {}
