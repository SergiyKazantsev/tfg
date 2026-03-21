import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonInput, IonItem, IonList,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, ReactiveFormsModule, IonList, IonInput, IonButton]
})
export class EditarPerfilPage implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  editForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async ngOnInit() {
    // Cargamos los datos actuales del usuario
    const user = this.auth.currentSession?.user;
    if (user) {
      this.editForm.patchValue({
        firstName: user.user_metadata?.['first_name'],
        lastName: user.user_metadata?.['last_name'],
        email: user.email
      });
    }
  }

  async onUpdate() {
    const loading = await this.loadingCtrl.create({message: 'Actualizando...'});
    await loading.present();

    const {firstName, lastName, email} = this.editForm.value;

    const { data, error } = await this.auth.updateUser({
      email: email, // El email va aquí fuera
      data: {
        first_name: firstName,
        last_name: lastName
      }
    });
    this.auth.getSession();
    await loading.dismiss();

    if (error) {
      this.presentToast('Error al actualizar: ' + error.message, 'danger');
    } else {
      this.presentToast('Perfil actualizado correctamente', 'success');
      this.router.navigate(['/soprano/profile']);
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color
    });
    await toast.present();
  }
}
