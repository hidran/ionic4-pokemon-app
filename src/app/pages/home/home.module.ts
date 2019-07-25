import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';
import {PokemonDetailPage} from '../pokemon-detail/pokemon-detail.page';
import {PokemonDetailPageModule} from '../pokemon-detail/pokemon-detail.module';

const routes = [
    {path: '', component: HomePage},
    {
        path: 'pokemon-detail/:id',
        component: PokemonDetailPage
    }

];

@NgModule({
    imports: [
        PokemonDetailPageModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
