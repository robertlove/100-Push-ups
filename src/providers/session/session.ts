import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SessionProvider {

  sessions: string = 'assets/sessions.json';

  constructor(private http: Http) {
    console.log('Hello SessionProvider');
  }

  find(progress): any {
    return this.http.get(this.sessions)
    .map(response => response.json())
    .map(x => x.filter(y => y.level === progress.level && y.week === progress.week && y.day === progress.day));
  }

  findAll(): any {
    return this.http.get(this.sessions).map(response => response.json());
  }

  findNext(progress): any {
    return this.http.get(this.sessions).map(response => response.json());
  }

}
