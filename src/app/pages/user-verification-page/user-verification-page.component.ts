import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Invitee} from '../../shared/interfaces/invitee'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {ActivatedRoute} from '@angular/router'
import {map, Observable, of, switchMap, tap} from 'rxjs'

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit, AfterContentChecked {
  // public eventName = ''
  public currentInvitee: Observable<Invitee> = null
  public user: Invitee = {
    uid: null,
    name: null,
    email: null,
    telegram: null
  }
  private readonly collectionName = 'demo-name-telegram'
  private readonly inviteesListLocalKey = 'bali-ukraine-invitees-list'

  constructor(
    private angularFirestore: AngularFirestore,
    private firebaseInteraction: FirebaseInteractionService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.eventName = params['event-id']
    // })

    this.currentInvitee = this.route.queryParams.pipe(
      switchMap(params => {
        const {name, email, telegram} = params
        this.user = {name, email, telegram, uid: null}
        return this.fetchInviteesList().pipe(
          map(list => {
            return list.find(el => el.email === email)
          })
        )
      })
    )

    this.fetchInviteesList().subscribe(d => {
      console.log('OBS', d)
    })
  }

  ngAfterContentChecked(): void {
    // To get rid of error
    // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'null'
    this.changeDetector.detectChanges()
  }

  private fetchInviteesList(): Observable<Invitee[]> {
    const list = localStorage.getItem(this.inviteesListLocalKey)
    if (!list) {
      return this.firebaseInteraction.getStoreCollection<Invitee>(this.collectionName).pipe(
        tap(data => localStorage.setItem(this.inviteesListLocalKey, JSON.stringify(data)))
      )
    } else {
      return of(JSON.parse(list) as Invitee[])
    }
  }

}
