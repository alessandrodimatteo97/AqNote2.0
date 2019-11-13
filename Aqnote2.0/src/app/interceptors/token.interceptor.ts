import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {X_AUTH} from '../constants';
import {AlertController, NavController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {error} from 'util';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private errorRequest: string;
    private errorRequestMessage: string;
    private newUser: string;
    private newUserMessage: string;
    private serverError: string;
    private serverErrorMessage: string;
    private userAlreadyExist: string;
    private userAlreadyExistMessage: string;
    private oldPasswordVoid: string;
    private oldPasswordVoidMessage: string;

    constructor(private navController: NavController,
                private alertController: AlertController,
                private userService: UserService,
                private translateService: TranslateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.initTranslate();
        // Get the auth token from the service.
        const authToken = this.userService.getAuthToken();
        if (authToken !== null && authToken !== undefined && authToken !== '') {
            console.log('adding token into header');
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({
                headers: req.headers.set(X_AUTH, `${authToken}`)
            });
            console.log(authReq);
            return next.handle(authReq).pipe(
                catchError(err => {
                    if (err.status === 421) { this.showError(this.userAlreadyExist, this.userAlreadyExistMessage, false); }
                    if (err.status === 422) { this.showError(this.oldPasswordVoid, this.oldPasswordVoidMessage, false); }
                    if (err.status === 409 ) { this.showError(this.errorRequest, this.errorRequestMessage, false); }
                    if (err.status === 200) { this.showError(this.newUser, this.newUserMessage, true); }
                    if (err.status !== 409 && err.status !== 422 && err.status !== 421 && err.status !== 200) { this.showError(this.serverError, this.serverErrorMessage, true); }
                    return EMPTY;
                })
            );
        } else {
            return next.handle(req);
        }

        //  return next.handle(req);
    }

    async showError(status: string, message: string, signIn: boolean) {

        const alert = await this.alertController.create({
            header: status,
            message,
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                    if (signIn) {  this.navController.navigateRoot('sign-in'); }
                    }
                }
            ]
        });

        await alert.present();
    }

    initTranslate() {
        this.translateService.get('ERRORREQUEST').subscribe((data:string)=>{
            this.errorRequest = data;
        });
        this.translateService.get('FIELDSWRONG').subscribe((data: string) => {
            this.errorRequestMessage = data;
        });
        this.translateService.get('NEWUSER').subscribe((data: string) => {
            this.newUser = data;
        });
        this.translateService.get('USERCREATED').subscribe((data: string) => {
            this.newUserMessage = data;
        });
        this.translateService.get('ERROR').subscribe((data: string) => {
            this.serverError = data;
        });
        this.translateService.get('PROBLEMSERVER').subscribe((data: string) => {
            this.serverErrorMessage = data;
        });
        this.translateService.get('USERALREADYEXIST').subscribe((data: string) => {
            this.userAlreadyExist = data;
        });
        this.translateService.get('USERALREADYEXISTMESSAGE').subscribe((data: string) => {
            this.userAlreadyExistMessage = data;
        });
        this.translateService.get('OLDPASSWORDWOID').subscribe((data: string) => {
            this.oldPasswordVoid = data;
        });
        this.translateService.get('OLDPASSWORDWOIDMESSAGE').subscribe((data: string) => {
            this.oldPasswordVoidMessage = data;
        });
    }
}
