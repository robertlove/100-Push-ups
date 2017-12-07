import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SessionProvider {

  constructor(private http: Http) {
    console.log('Hello SessionProvider');
  }

  get(progress): any {
    return this.http.get('assets/sessions.json')
    .map(response => response.json())
    .map(x => x.filter(y => y.level === progress.level && y.week === progress.week && y.day === progress.day));
  }

}
