import {Component} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {Observable} from 'rxjs';
import {Subject} from '../../model/Subject.model';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.page.html',
    styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage  {
    private favourites$: Observable<Subject[]>;

    constructor(private menu: MenuController,
                private userService: UserService,
                private modalController: ModalController,
                private subjectService: SubjectService) {}
    ionViewWillEnter() {
        this.userService.getUtente().subscribe(res => {
            this.favourites$ = this.subjectService.listFavourite();
        });
    }
}
