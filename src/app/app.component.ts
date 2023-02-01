import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bali-ukraine-main-client';

  constructor(private store: AngularFirestore) {
  }

  ngOnInit() {
    console.log('INIT')
    // this.store.collection('foobar').valueChanges().subscribe(d => {
    //   console.log('changes', d)
    // })

    // this.store.collection('foobar').doc('foobar').get().subscribe(d => d.data())
  }

  public submit(): void {
    this.store.collection('foobar').add({name: 'user', payment: true}).then()
  }
}
