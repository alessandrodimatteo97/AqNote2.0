import {Component, OnChanges, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subject} from '../../model/Subject.model';
import {User} from '../../model/User.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
    private d$: Observable<Subject[]>;
    private userLogged$: BehaviorSubject<User>;
    private isLogged: boolean;
    constructor(private menu: MenuController,
                private userService: UserService,
                private modalController: ModalController,
                private subjectService: SubjectService,
                private router: Router) {}

    ngOnInit() {}

    ionViewWillEnter() {
        this.userLogged$ = this.userService.getUtente();
        this.userLogged$.subscribe(res => {
            if (res != null) {
                this.d$ = this.subjectService.listFavourite(res.idU);
            } else {
                this.router.navigate(['/sign-in']);
            }
        });
    }
}
