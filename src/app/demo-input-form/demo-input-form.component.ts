import { Component } from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {FormControl, Validators} from '@angular/forms'





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

  constructor(private store: AngularFirestore) {
    // this.store.collection('foobar').valueChanges().subscribe(d => console.log('changes', d))
    // this.store.collection('foobar').doc('foobar').get().subscribe(d => d.data())
  }

  public submit(e: Event): void {
    e.preventDefault()
    e.stopPropagation()
    if (this.name.valid && this.telegram.valid) {

      // this.onSuccess()
      this.store.collection('demo-name-telegram').add({
        name: this.name.value,
        telegram: this.telegram.value
      }).then(res => this.onSuccess(res))
    }
  }
  private onSuccess(res?): void {
    console.log('>> success DEMO', res)

    this.qrData.data = JSON.stringify({
      name: this.name.value,
      telegram: this.telegram.value
    })

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
