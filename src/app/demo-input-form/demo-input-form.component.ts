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
      this.store.collection('demo-name-telegram').add({name: this.name.value, telegram: this.telegram.value}).then(d => {
        this.submitRef = {
          disabled: true,
          label: 'Success'
        }
      })
    }
  }

  public reset(): void {
    this.name.reset()
    this.telegram.reset()
    this.submitRef = this.submitRefDefault
  }
}
