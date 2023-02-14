import { Injectable } from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {from, map, Observable, take, tap} from 'rxjs'
import {firestoreCollectionName} from '../constants'
import {Invitee} from '../interfaces/invitee'
import {SpreadsheetSyncService} from './spreadsheet-sync.service'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FirebaseInteractionService {
  private readonly apiKey = 'AIzaSyDM9ikfEQ0lvDx0Q7o4NNh306nQyaXrU6U'
  private readonly sheetId = '1hdSYqDsm-vvaph51wGmA_AL2euA4CsypHhEV4kGk8KY'

  constructor(private store: AngularFirestore, private spreadsheetSyncService: SpreadsheetSyncService, private http: HttpClient) {
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
  public syncFirebaseFromSpreadsheets() {
    this.fetchSheetData().pipe(
      tap(list => this.addDocumentsToCollection(list)),
      // take(1)
    ).subscribe()
  }
  private addDocumentsToCollection(docs: Invitee[]) {
    console.log('>>>>', docs.length, docs)
    docs.filter(el => !!el.email).forEach(d => {
      this.store.collection(firestoreCollectionName).doc(d.email.toString()).set(d)
    })
  }
  public fetchSheetData(): Observable<Invitee[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Sheet1?key=${this.apiKey}`

    return this.http.get(url).pipe(
      map((res: Object & {values: Array<string>}) => FirebaseInteractionService.mapDataToFirebase(res.values))
    )
  }

  private static mapDataToFirebase(list: Array<string>): Invitee[] {
    return list.map(el => {
      return  {
        name: el[1] ?? 'N/A',
        email: el[4].toLocaleLowerCase(),
        telegram: el[6] ?? 'N/A',
        amount: +el[2]
      }
    })
  }
}
