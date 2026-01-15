import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonButton, IonIcon, IonInput, IonItem} from "@ionic/angular/standalone";
import {ItemCompra} from "../services/data.service";
import {text} from "ionicons/icons";

@Component({
  selector: 'app-item-compra-form',
  templateUrl: './item-compra-form.component.html',
  styleUrls: ['./item-compra-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonIcon,
    IonItem
  ]
})
export class ItemCompraFormComponent {
  itemForm = new FormGroup({
    text: new FormControl('', Validators.required),
  });
  @Output() itemSubmit = new EventEmitter<Partial<ItemCompra>>();

  constructor() { }

  submitForm() {
    if (this.itemForm.invalid) return;

    const formValue = this.itemForm.value;

    // Create the object to send
    const newItem: Partial<ItemCompra> = {
      name: formValue.text || '', // Map form 'text' to interface 'name'
      checked: false
    };
    this.itemSubmit.emit(newItem);
    this.itemForm.reset();
  }
}
