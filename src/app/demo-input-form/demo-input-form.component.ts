import { Component } from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {FormControl, Validators} from '@angular/forms'
import {firestoreCollectionName} from '../shared/constants'


@Component({
  selector: 'app-demo-input-form',
  templateUrl: './demo-input-form.component.html',
  styleUrls: ['./demo-input-form.component.css']
})
export class DemoInputFormComponent {
  private readonly submitRefDefault  = {
    label: 'Submit',
    disabled: false
  }
  // TODO: state management
  // public state = {
  //   submitted: false
  // }
  //
  public qrData = {
    data: null
  }


  public submitRef  = this.submitRefDefault
  public name = new FormControl('', [Validators.required])
  public telegram = new FormControl('', [Validators.required])
  public email = new FormControl('', [Validators.required, Validators.email])
  public amount = new FormControl('', [Validators.required])

  constructor(private store: AngularFirestore) {}

  public submit(e: Event): void {
    e.preventDefault()
    e.stopPropagation()
    if (this.name.valid && this.telegram.valid && this.email.valid) {
      this.store.collection(firestoreCollectionName).add({
        name: this.name.value,
        telegram: this.telegram.value,
        email: this.email.value,
        amount: this.amount.value
      }).then(() => this.onSuccess())
    }
  }
  private onSuccess(): void {
    const domain = 'https://ukraine-bali.web.app/my/event-verification/'
    const eventName = 'kochaitesia-chornobryvi'
    const url = new URL(domain + eventName)
    url.searchParams.set('name', this.name.value)
    url.searchParams.set('telegram', this.telegram.value)
    url.searchParams.set('email', this.email.value)

    this.qrData.data = url.href

    console.log('QR URL', url.href)
    this.submitRef = {
      disabled: true,
      label: 'Success'
    }
  }

  public onChangeURL(event): void {
    console.log('changed', event)
  }

  public reset(): void {
    this.name.reset()
    this.telegram.reset()
    this.submitRef = this.submitRefDefault
  }
}
