import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {User} from '../../shared/interfaces/user'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'
import {ActivatedRoute, Route} from '@angular/router'
import {combineLatest} from 'rxjs'

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit {
  private readonly collectionName = 'demo-name-telegram'

  public eventName = ''
  public user = {
    name: null,
    email: null,
    telegram: null
  }
  constructor(private angularFirestore: AngularFirestore, private firebaseInteraction: FirebaseInteractionService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventName = params['event-id']
      console.log(this.eventName)
    })
    this.route.queryParams.subscribe(qp  => {
      const {name, email, telegram} = qp
      this.user = {name, email, telegram}
    })

    this.firebaseInteraction.getStoreCollection<User>(this.collectionName).subscribe(data => {
      console.log('LIST', data)
    })

    this.firebaseInteraction.getStoreCollectionDocByKey<User>(this.collectionName, 'telegram', '@asd').subscribe(data => {
      console.log('KEY', data)
    })
  }
}
