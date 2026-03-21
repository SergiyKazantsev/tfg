import {Routes} from '@angular/router';
import {authGuard} from "./guards/auth-guard";
import {publicGuard} from "./guards/public-guard";
import {TabsComponent} from "./tabs/tabs.component";

export const routes: Routes = [
  {
    path: 'soprano',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./perfil/profile/profile.page').then(m => m.ProfilePage),
        canActivate: [authGuard]
      },
      {
        path: 'edit-profile',
        loadComponent: () => import('./perfil/editar-perfil/editar-perfil.page').then(m => m.EditarPerfilPage),
        canActivate: [authGuard]
      },
    ],
  },
  {
    path: '',
    redirectTo: 'soprano/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login-registro/login/login.page').then(m => m.LoginPage),
    canActivate: [publicGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./login-registro/register/register.page').then(m => m.RegisterPage),
    canActivate: [publicGuard]
  },
];

