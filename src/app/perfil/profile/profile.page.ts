import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonItemDivider, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItemDivider]
})
export class ProfilePage {
  auth = inject(AuthService);
  private router = inject(Router);
  user: any = null;
  constructor() {}

  async ionViewWillEnter() {
    this.user = this.auth.currentSession?.user.user_metadata;
  }

  async editProfile() {
    await this.router.navigate(['/soprano/edit-profile']);
  }

  async logout() {
    await this.auth.signOut();
    await this.router.navigate(['/soprano/home']);
  }
}
