import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItemDivider,
  IonRouterLinkWithHref,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonInput, IonRow, IonText, ReactiveFormsModule, RouterLink, IonItemDivider, IonRouterLinkWithHref]
})
export class LoginPage implements OnInit {
  auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor() {
  }

  async ngOnInit() {
    if (this.auth.loggedIn()) {
      await this.router.navigate(['/home']);
    }
  }

  async onLogin() {
    const {error} = await this.auth.signIn(this.profileForm.value.email as string, this.profileForm.value.password as string);
    if (error) {
      const toast = await this.toastController.create({
        message: 'Error de login. Por favor, compruebe las credenciales.',
        duration: 5000, // Se va solo después de 3 segundos
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    } else {
      this.profileForm.reset();
      await this.router.navigate(['/soprano/home']);
    }
  }
}
