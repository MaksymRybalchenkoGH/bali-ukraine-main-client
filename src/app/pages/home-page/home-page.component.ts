import { Component } from '@angular/core'
import {SpreadsheetSyncService} from '../../shared/services/spreadsheet-sync.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


  constructor(private spreadsheetsDbSyncService: SpreadsheetSyncService) {

    this.spreadsheetsDbSyncService.fetchSheetData().subscribe(d => {
      console.log('d', d)
    })

  }

}
