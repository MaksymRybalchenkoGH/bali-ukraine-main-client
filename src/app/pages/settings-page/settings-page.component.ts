import { Component } from '@angular/core';
import {FirebaseInteractionService} from '../../shared/services/firebase-interaction.service'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent {

  constructor(private firebaseInteractionService: FirebaseInteractionService) {
  }
  public syncFirebase(): void {
    this.firebaseInteractionService.syncFirebaseFromSpreadsheets()
  }
}
