import { Injectable } from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {map, Observable, take} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirebaseInteractionService {

  constructor(private store: AngularFirestore) {
    // this.store.collection('foobar').valueChanges().subscribe(d => console.log('changes', d))
    // this.store.collection('foobar').doc('foobar').get().subscribe(d => d.data())
    // this.store.collection(this.collectionName, ref => ref.where('telegram', '==', '@asd'))


  }

  public getStoreCollection<T>(collectionName: string): Observable<T[]> {
    return this.store.collection(collectionName).get().pipe(
      take(1),
      map(snapshot => snapshot.docs.map(el=> el.data() as T))
    )
  }

  public getStoreCollectionDocByKey<T>(collectionName: string, key: string, value: any): Observable<T[]> {
    return this.store.collection(
      collectionName,
      ref => ref.where(key, '==', value)
    ).get().pipe(
      take(1),
      map(snapshot => snapshot.docs.map(el=> el.data() as T))
    )
  }
}
