import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { SessionProvider } from '../providers/session/session';
import { TimerComponent } from '../components/timer/timer';
import { HomePage } from '../pages/home/home';
import { TestPage } from '../pages/test/test';
import { SessionPage } from '../pages/session/session';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    SessionPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    SessionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionProvider
  ]
})

export class AppModule {}
