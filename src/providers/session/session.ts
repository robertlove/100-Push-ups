import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SessionProvider {

  constructor(public http: Http) {
    console.log('Hello SessionProvider');
  }

  get(level: number, week: number, day: number): any {
    return this.http.get('assets/sessions.json')
    .map(response => response.json())
    .map(x => x.filter(y => y.level === level && y.week === week && y.day === day));
  }

  next(): any {
    return;
  }

  prev(): any {
    return;
  }

}
