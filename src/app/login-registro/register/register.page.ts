import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput, IonItemDivider, IonRouterLinkWithHref, IonRow, IonText,
  IonTitle,
  IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, ReactiveFormsModule, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonInput, IonButton, IonText, IonRouterLinkWithHref, RouterLink, IonItemDivider]
})
export class RegisterPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor() {
  }

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/soprano/home']);
    }
  }

  async onRegister() {
    const {firstName, lastName, email, password} = this.registerForm.value;

    // Pasamos los nombres como metadata para que Supabase los guarde
    const {error} = await this.auth.signUp(
      email as string,
      password as string,
      {first_name: firstName, last_name: lastName}
    );

    if (error) {
      this.presentToast(error.message, 'danger');
    } else {
      this.presentToast('¡Cuenta creada!', 'success');
      this.registerForm.reset();
      await this.router.navigate(['/soprano/home']);
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}
