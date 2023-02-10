import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {User} from '../../shared/interfaces/user'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {ActivatedRoute, Route} from '@angular/router'
import {combineLatest, Observable, of, tap} from 'rxjs'

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit {
  private readonly collectionName = 'demo-name-telegram'
  private readonly inviteesListLocalKey = 'bali-ukraine-invitees-list'

  // public eventName = ''
  public inviteesList: Observable<User[]> = null
  public user = {
    name: null,
    email: null,
    telegram: null
  }
  constructor(private angularFirestore: AngularFirestore, private firebaseInteraction: FirebaseInteractionService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.eventName = params['event-id']
    // })

    this.route.queryParams.subscribe(qp  => {
      const {name, email, telegram} = qp
      this.user = {name, email, telegram}
    })

    this.inviteesList = this.fetchInviteesList()


    // this.firebaseInteraction.getStoreCollectionDocByKey<User>(this.collectionName, 'telegram', '@asd').subscribe(data => {
    //   // console.log('KEY', data)
    // })
  }

  private fetchInviteesList(): Observable<User[]> {
    const list = localStorage.getItem(this.inviteesListLocalKey)
    if (!list) {
      return this.firebaseInteraction.getStoreCollection<User>(this.collectionName).pipe(
        tap(data => localStorage.setItem(this.inviteesListLocalKey, JSON.stringify(data)))
      )
    } else {
      return of(JSON.parse(list) as User[])
    }
  }

}
