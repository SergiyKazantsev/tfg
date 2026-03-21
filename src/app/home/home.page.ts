import {Component, inject, OnInit} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonList, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {DataService, ItemCompra} from '../services/data.service';
import {ItemCompraComponent} from "../item-compra/item-compra.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemCompraFormComponent} from "../item-compra-form/item-compra-form.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, ItemCompraComponent, ReactiveFormsModule, ItemCompraFormComponent],
})
export class HomePage implements OnInit {
  data = inject(DataService);
  auth = inject(AuthService);
  private router = inject(Router);
  items: ItemCompra[] = [];

  constructor() {
  }

  async ngOnInit() {
    if (!this.auth.loggedIn()) {
      await this.router.navigate(['/login']);
    } else {
      this.items = await this.getItems();
    }
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
    await this.auth.signOut()
    this.router.navigate(['/login']);
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
