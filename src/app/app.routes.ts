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
        loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
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
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    canActivate: [publicGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
    canActivate: [publicGuard]
  },
];

