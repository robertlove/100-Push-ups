import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionsPage } from '../../pages/sessions/sessions';

@IonicPage()

@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})

export class TestsPage {

  private testsForm: FormGroup;

  heading: string = 'Exhaustion Test';

  weekAndDay: string = null;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private navParams: NavParams) {

    this.weekAndDay = this.navParams.get('weekAndDay');

    switch (this.weekAndDay) {
      case null:
        this.heading = 'Initial Test';
        break;
      case '63':
        this.heading = 'Final Test';
        break;
    }

    this.testsForm = formBuilder.group({
      number: [0, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5)
      ])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestsPage');
  }

  submit() {

    let number = this.testsForm.value.number;

    console.log('TestsPage.submit number', number);

    let progress = {
      level: 1,
      week: 1,
      day: 1
    };

    if (number < 6) {
      return this.navCtrl.push(SessionsPage, progress);
    }

    if (number < 11) {
      progress.level = 2;
      return this.navCtrl.push(SessionsPage, progress);
    }

    progress.level = 3;
    return this.navCtrl.push(SessionsPage, progress);

  }

}
