import { Routes } from '@angular/router';
import {TabsComponent} from "./tabs/tabs.component";

export const routes: Routes = [
  {
    path: 'soprano',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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

];

