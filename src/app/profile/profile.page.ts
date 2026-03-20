import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonButton, IonList, IonItem, IonLabel, IonIcon]
})
export class ProfilePage {
  data = inject(DataService);
  user = {
    name: 'Sergiy',
    username: 'sergiy',
    email: 'sergiy@ua.es',
  };

  constructor() {}

  editProfile() {
    console.log('Abriendo editor de perfil...');
  }

  async logout() {
    await this.data.signOut();
  }
}
