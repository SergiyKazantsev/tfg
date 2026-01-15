import {Component, inject} from '@angular/core';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader,
  IonContent,
  IonHeader, IonInput,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent
} from '@ionic/angular/standalone';
import {DataService, ItemCompra} from '../services/data.service';
import {ItemCompraComponent} from "../item-compra/item-compra.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ItemCompraFormComponent} from "../item-compra-form/item-compra-form.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, ItemCompraComponent, IonButton, IonCard, IonCardHeader, IonCardContent, IonInput, ReactiveFormsModule, ItemCompraFormComponent],
})
export class HomePage {
  data = inject(DataService);
  items: ItemCompra[] = [];

  profileForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {
  }

  async refresh(ev: any) {
    this.items = await this.getItems();
    (ev as RefresherCustomEvent).detail.complete();
  }

  async ngOnInit() {
    this.items = await this.getItems();
  }

  async getItems() {
    const {data, error} = await this.data.getMessages();

    if (error) {
      console.error(error);
      return []
    }
    return data || [];
  }

  async onClick() {
    await this.data.signOut()
  }

  async onLogin() {
    await this.data.signIn(this.profileForm.value.email as string, this.profileForm.value.password as string);
    this.items = await this.getItems();
    this.profileForm.reset()
  }

  async handleDelete($event: ItemCompra) {
    await this.data.deleteItem($event);
    this.items = this.items.filter(i => i.id !== $event.id);
  }

  async handleCheck(updatedItem: ItemCompra) {
    await this.data.checkItem(updatedItem);
    this.items = this.items.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
  }

  async handleCreate($event: Partial<ItemCompra>) {
    const item = await this.data.createItem($event);
    this.items.push(item);
  }
}
