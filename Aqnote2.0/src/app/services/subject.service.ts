import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {URL} from '../constants';
import {Subject} from '../model/Subject.model';
import {User} from "../model/User.model";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private userService: UserService) { }

  list(year, idDC ): Observable<Subject[]> {
    const subjectUrl = `${URL.SUBJECTS}/${year}/${idDC}`;

    return this.http.get<Subject[]>(subjectUrl);


  }

  list1(idDC): Observable<Subject[]> {
    const subjectUrl = `${URL.SUBJECTS}/${idDC}`;
    return this.http.get<Subject[]>(subjectUrl);
  }

  listHome(): Observable<Subject[]> {
    const subjectUrl = `${URL.HOME}`;
    return this.http.get<Subject[]>(subjectUrl);
}

  listFavourite(idU): Observable<Subject[]> {
    const favouriteUrl = `${URL.FAVOURITE}/${idU}`;
    console.log(favouriteUrl);
    return this.http.get<Subject[]>(favouriteUrl);
  }
}
