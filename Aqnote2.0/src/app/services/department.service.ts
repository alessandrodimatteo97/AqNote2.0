import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../model/Department.model';
import {URL} from '../constants';
// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  constructor(private http: HttpClient) { }

  list(): Observable<Department[]> {
    return this.http.get<Department[]>(URL.DEPARTMENTS);
  }

}
