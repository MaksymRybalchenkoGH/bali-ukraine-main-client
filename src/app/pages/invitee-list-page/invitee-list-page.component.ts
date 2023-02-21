import {Component, OnInit} from '@angular/core'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {Invitee} from '../../shared/interfaces/invitee'
import {firestoreCollectionName} from '../../shared/constants'
import {BehaviorSubject} from 'rxjs'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-invitee-list-page',
  templateUrl: './invitee-list-page.component.html',
  styleUrls: ['./invitee-list-page.component.css']
})
export class InviteeListPageComponent implements OnInit {
  private listInitialData = []
  private listSubject = new BehaviorSubject<Invitee[]>(this.listInitialData)
  public inviteeList = this.listSubject.asObservable()
  public remainingTickets = 0
  public search = new FormControl('')

  constructor(private firebaseInteractionService: FirebaseInteractionService) {
  }

  ngOnInit() {
    this.refreshList()
    this.search.valueChanges.subscribe(value => {
      if (value) {
        const list = this.listInitialData
        const filtered = list.filter(el => {
          return el.email.toLowerCase().includes(value.toLowerCase()) || el.name.toLowerCase().includes(value.toLowerCase())
        })
        this.listSubject.next(filtered)
      } else {
        this.listSubject.next(this.listInitialData)
      }

    })
  }

  public refreshList(): void {
    this.listSubject.next([])
    this.firebaseInteractionService.getStoreCollection<Invitee>(firestoreCollectionName).subscribe(list => {
      this.listInitialData = list
      this.remainingTickets = list.reduce((acc, el) => {
        return acc += el.amount
      }, 0)
      this.listSubject.next(list)
    })
  }

}
