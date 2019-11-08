import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {X_AUTH} from '../constants';
import {AlertController, NavController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {error} from 'util';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private navController: NavController,
                private alertController: AlertController,
                private userService: UserService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
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
                   if (err.status == 409 ) { this.showError('Error in the request', 'one of the filds is wrong', false); }
                    if (err.status == 200) { this.showError('New user-profile', 'profile has been created', true); }
                    if (err.status != 409 &&  err.status != 200){ this.showError('Error', 'Problem with the server', true) }
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
            message: message,
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
}
