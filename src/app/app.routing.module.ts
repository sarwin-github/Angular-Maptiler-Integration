import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const rootRouterConfig: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },

  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'error',
        loadChildren: () => import('./views/error-page/error-page.module').then(m => m.ErrorPageModule)
      }
    ]
  },

  {
    path: 'map',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/maptiler/maptiler.module').then(m => m.MapTilerModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

const routerOptions: any = {
  useHash: false,
  //anchorScrolling: 'false',
};

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig, routerOptions)],
  exports: [RouterModule],
  /*providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],*/
})
export class AppRoutingModule { }