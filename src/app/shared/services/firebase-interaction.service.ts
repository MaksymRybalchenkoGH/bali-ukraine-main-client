import { Injectable } from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {from, map, Observable, skip, take, tap} from 'rxjs'
import {firestoreCollectionName} from '../constants'

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
      map(snapshot => snapshot.docs.map(el=> Object.assign(el.data(), {id: el.id}) as T))
    )
  }

  public updateCollectionDocument<T>(docId: string, data: T): Observable<any> {
    return from(this.store.doc<T>(`${firestoreCollectionName}/${docId}`).update(data))
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
