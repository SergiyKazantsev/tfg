import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemCompra} from "../services/data.service";
import {IonButton, IonIcon, IonItem, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'app-item-compra',
  templateUrl: './item-compra.component.html',
  styleUrls: ['./item-compra.component.scss'],
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class ItemCompraComponent {
  @Input({ required: true }) itemCompra!: ItemCompra;
  @Output() delete = new EventEmitter<ItemCompra>();
  @Output() check = new EventEmitter<ItemCompra>();
  constructor() { }

  deleteItem(itemCompra: ItemCompra) {
    this.delete.emit(itemCompra);
  }

  checkItem(itemCompra: ItemCompra) {
    this.check.emit(itemCompra);
  }
}
