import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionPage } from '../../pages/session/session';

@IonicPage()

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})

export class TestPage {

  private testForm: FormGroup;

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

    this.testForm = formBuilder.group({
      number: [0, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5)
      ])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  submit() {

    let number = this.testForm.value.number;

    console.log('TestPage.submit number', number);

    let progress = {
      level: 1,
      week: 1,
      day: 1
    };

    if (number < 6) {
      return this.navCtrl.push(SessionPage, progress);
    }

    if (number < 11) {
      progress.level = 2;
      return this.navCtrl.push(SessionPage, progress);
    }

    if (number < 21) {
      progress.level = 3;
      return this.navCtrl.push(SessionPage, progress);
    }

  }

}
