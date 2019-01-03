import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class GoogleTranslateProvider {

  key = 'trnsl.1.1.20181104T184529Z.2eeed1face0c3f14.c3463eaab31db9ab553dfd6e63cd29af9c06b448';

  constructor(public http: HttpClient) {
  }

  translateFunction(error, from = 'en', to = 'es'){
    const body = `key=${this.key}&text=${error}&lang=${from}-${to}`;
    return this.http.post(`https://translate.yandex.net/api/v1.5/tr.json/translate`, body, httpOptions)
  }

}
