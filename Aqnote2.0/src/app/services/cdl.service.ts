import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DegreeCourse} from '../model/DegreeCourse.model';
import {URL} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CdlService {

  constructor(private http: HttpClient) { }

  list(): Observable<DegreeCourse[]> {
    const cdlUrl = `${URL.CDL}/`;

    return this.http.get<DegreeCourse[]>(cdlUrl);
}
}
