import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import * as firebase from 'firebase/compat'
import {map} from 'rxjs'
import {User} from '../../shared/interfaces/user'
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit {
  private readonly collectionName = 'demo-name-telegram'

  constructor(private angularFirestore: AngularFirestore, private firebaseInteraction: FirebaseInteractionService) {
  }

  ngOnInit() {

    this.firebaseInteraction.getStoreCollection<User>(this.collectionName).subscribe(data => {
        console.log('LIST', data)
      })

    this.firebaseInteraction.getStoreCollectionDocByKey<User>(this.collectionName, 'telegram', '@asd').subscribe(data => {
        console.log('KEY', data)
      })
  }
}
