import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Invitee} from '../../shared/interfaces/invitee'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {ActivatedRoute} from '@angular/router'
import {BehaviorSubject, map, Observable, of, switchMap, tap} from 'rxjs'
import {firestoreCollectionName} from '../../shared/constants'

interface InviteeValidation {
  completed: boolean
  invitee: Invitee
}

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit, AfterContentChecked {
  // public eventName = ''
  private readonly inviteeValidationDefaultData: InviteeValidation = {
    completed: false,
    invitee: null
  }
  private inviteeSubject =  new BehaviorSubject<InviteeValidation>(this.inviteeValidationDefaultData)
  public currentInvitee: Observable<InviteeValidation> = this.inviteeSubject.asObservable()

  public user: Invitee = {
    id: null,
    name: null,
    email: null,
    telegram: null,
    amount: null
  }
  private readonly collectionName = firestoreCollectionName
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
    this.route.queryParams.pipe(
      switchMap((params: Invitee) => {
        this.user = {...params}
        return this.firebaseInteraction.getStoreCollection<Invitee>(this.collectionName).pipe(
          map(list => {
            this.inviteeSubject.next({
              completed: true,
              invitee: list.find(el => el.email.toLocaleLowerCase() === params.email.toLocaleLowerCase()) ?? null
            })

          })
        )
      })
    ).subscribe()

  }

  ngAfterContentChecked(): void {
    // To get rid of error
    // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'null'
    this.changeDetector.detectChanges()
  }

  public validateTicket(): void {
    // call update DB here
    const inviteeValue = this.inviteeSubject.getValue().invitee
    console.log('ID', inviteeValue)
    this.firebaseInteraction.updateCollectionDocument(inviteeValue.id, {amount: --inviteeValue.amount})
    localStorage.removeItem(this.inviteesListLocalKey)
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
