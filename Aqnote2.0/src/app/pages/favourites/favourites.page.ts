import {Component, OnChanges, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subject} from '../../model/Subject.model';
import {User} from "../../model/User.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
    private d$: Observable<Subject[]>;
    private userLogged$: BehaviorSubject<User>;

    constructor(private menu: MenuController,
                private userService: UserService,
                private modalController: ModalController,
                private subjectService: SubjectService) {}

    ngOnInit() {
        this.userService.getUtente().subscribe(res => {
            this.d$ = this.subjectService.listFavourite(res.idU);
        });
    }
}
