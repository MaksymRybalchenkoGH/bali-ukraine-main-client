import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {map} from 'rxjs'
import {User} from '../../shared/interfaces/user'

@Component({
  selector: 'app-user-verification-page',
  templateUrl: './user-verification-page.component.html',
  styleUrls: ['./user-verification-page.component.css']
})
export class UserVerificationPageComponent implements OnInit {
  private readonly collectionName = 'demo-name-telegram'

  constructor(private angularFirestore: AngularFirestore) {
  }

  ngOnInit() {

    this.angularFirestore.collection(this.collectionName).get()
      .pipe(map(docSnapshot => docSnapshot.docs.map(el=> el.data() as User)))
      .subscribe((data: User[])  => {
        console.log('ddd', data)
      })
  }
}
