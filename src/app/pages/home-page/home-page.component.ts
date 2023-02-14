import {Component, OnInit} from '@angular/core'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {Invitee} from '../../shared/interfaces/invitee'
import {firestoreCollectionName} from '../../shared/constants'
import {BehaviorSubject} from 'rxjs'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private listInitialData = []
  private listSubject = new BehaviorSubject<Invitee[]>(this.listInitialData)
  public inviteeList = this.listSubject.asObservable()

  public search = new FormControl('')

  constructor(private firebaseInteractionService: FirebaseInteractionService) {
  }
  ngOnInit() {
    this.refreshList()
    this.search.valueChanges.subscribe(value => {
      if (value) {
        const list = this.listInitialData
        const filtered = list.filter(el => el.email.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
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
      this.listSubject.next(list)
    })
  }

}
