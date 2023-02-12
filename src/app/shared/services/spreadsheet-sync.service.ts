import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {Invitee} from '../interfaces/invitee'

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetSyncService {
  private readonly apiKey = 'AIzaSyDM9ikfEQ0lvDx0Q7o4NNh306nQyaXrU6U'
  private readonly sheetId = '1hdSYqDsm-vvaph51wGmA_AL2euA4CsypHhEV4kGk8KY'

  constructor(private http: HttpClient) { }

  public fetchSheetData(): Observable<Invitee[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Sheet1?key=${this.apiKey}`

    return this.http.get(url).pipe(
      map((res: Object & {values: Array<string>}) => SpreadsheetSyncService.mapDataToFirebase(res.values))
    )
  }

  private static mapDataToFirebase(list: Array<string>): Invitee[] {
    return list.map(el => {
      return  {
        name: el[1],
        email: el[4],
        telegram: el[6],
        amount: +el[2]
      }
    })
  }
}
