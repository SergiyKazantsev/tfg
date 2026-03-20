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
    ],
  },
  {
    path: '',
    redirectTo: 'soprano/home',
    pathMatch: 'full',
  },
];

