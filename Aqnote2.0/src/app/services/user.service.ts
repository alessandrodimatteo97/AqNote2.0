import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AUTH_TOKEN, URL, USER_STORAGE, X_AUTH} from '../constants';
import {User} from '../model/User.model';
import {delay, map} from 'rxjs/operators';
import {Storage} from '@ionic/storage';

export interface Account {
  name: string;
  surname: string;
  email: string;
  matriculation: string;
  password: string;
  repeatPassword: string;
}

export interface AccountUpdate {
  name: string;
  surname: string;
  mail: string;
  matriculationNumber: string;
  oldPassword: string;
  newPassword: string;
}

export interface LoginAccount {
  email: string;
  password: string;

}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authToken: string;
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private utente$: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get(AUTH_TOKEN).then((token) => {
      console.log(token);
      this.authToken = token;

      if (token !== null && token !== undefined && token !== '') {
        this.loggedIn$.next(true);
      }
    });
    this.storage.get(USER_STORAGE).then((utente) => {
      this.utente$.next(utente);
    });

  }

  // update profile in post con possaggio del token come header con password e repeatpassword




// signup in post
  signUp(account: Account) {
    const params = new HttpParams()
        .set('name', account.name)
        .set('surname', account.surname)
        .set('mail', account.email)
        .set('matriculationNumber', account.matriculation)
        .set('password', account.password)
        .set('repeatPassword', account.repeatPassword);

    const signUpUrl = `${URL.SIGNUP}/?${params}`;
    return this.http.post<User>(URL.SIGNUP, account, {observe: 'response'}).pipe(
      map((resp: HttpResponse<User>) => {
        console.log(resp);
      }));
  }

  update(account: AccountUpdate) {
    const params = new HttpParams()
        .set('name', account.name)
        .set('surname', account.surname)
        .set('mail', account.mail)
        .set('matriculationNumber', account.matriculationNumber)
        .set('oldPassword', account.oldPassword)
        .set('newPassword', account.newPassword);


    const updateUrl = `${URL.UPDATE}/`;
    return this.http.post<User>(URL.UPDATE, account, {observe: 'response'}).pipe(
      map((resp: HttpResponse<User>) => {
        console.log(resp);
      }));
  }
/*
  login(loginAccount: LoginAccount) {
    const params = new HttpParams()
        .set('mail', loginAccount.email)
        .set('password', loginAccount.password);
    const loginUrl = `${URL.LOGIN}/?${params}`;
    return this.http.get<User>(loginUrl);
  }

 */
// login è in posti
  login(account: LoginAccount): Observable<User> {
   const params = new HttpParams()
        .set('mail', account.email)
        .set('password', account.password);
  // const loginUpUrl = `${URL.LOGIN}/?${params}`;
   return this.http.post<User>(URL.LOGIN, params, {observe: 'response'}).pipe(
       map((resp: HttpResponse<User>) => {
         const token = resp.headers.get(X_AUTH);
         console.log(resp.headers);
         this.storage.set(AUTH_TOKEN, token);
         this.authToken = token;
         console.log(resp.body);
         // Utente memorizzato nello storage in modo tale che se si vuole cambiare il
         // profilo dell'utente stesso non si fa una chiamata REST.
         this.storage.set(USER_STORAGE, resp.body);
         console.log(resp.headers.get('X-Auth'));

         // update dell'observable dell'utente
         this.utente$.next(resp.body);
         this.loggedIn$.next(true);
         return resp.body;
       }));
  }
  // get profile in post con passaggio del token come header
  getProfile(): Observable<User> {
    const cdlUrl = `${URL.PROFILE}`;

    return this.http.get<User>(cdlUrl);
  }

  getUtente(): BehaviorSubject<User> {
    return this.utente$;
  }

  getAuthToken(): string {
    return this.authToken;
  }

  isLogged(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }



}
