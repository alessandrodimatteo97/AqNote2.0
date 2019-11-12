import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {URL} from '../constants';
import {Subject} from '../model/Subject.model';

export interface Something {
  year: Subject[];

}

export interface Prova {

  subject: Subject;


}
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  list2( idDC ): Observable<any[]> {
    const subjectUrl = `${URL.SUBJECTS}/${idDC}`;
    return this.http.get<Something[]>(subjectUrl);


  }

  list1(idDC): Observable<Subject[]> {
    const subjectUrl = `${URL.SUBJECTS1}/${idDC}`;
    return this.http.get<Subject[]>(subjectUrl);
  }

  listHome(IdDC): Observable<Subject[]> {
    const subjectUrl = `${URL.HOME}/${IdDC}`;
    return this.http.get<Subject[]>(subjectUrl);
}

  listFavourite(idU): Observable<Subject[]> {
    const favouriteUrl = `${URL.FAVOURITE}/${idU}`;
    console.log(favouriteUrl);
    return this.http.get<Subject[]>(favouriteUrl);
  }
}
