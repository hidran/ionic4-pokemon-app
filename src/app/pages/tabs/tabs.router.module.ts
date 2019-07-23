
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'pokemons',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
       },
      {
        path: 'favorite',
        loadChildren: '../favorite/favorite.module#FavoritePageModule'
        },
      {
        path: 'contact',

            loadChildren: '../contact/contact.module#ContactPageModule'
        },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'pokemons/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pokemons/home'

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
