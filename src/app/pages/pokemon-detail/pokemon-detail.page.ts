import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Events, LoadingController} from '@ionic/angular';
import {IPokemonDetails} from '../../models/pokemon-details';
import {PokDataProvider} from '../../services/pok-data/pok-data';
import {Pokemon} from '../../models/pokemon';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.page.html',
    styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
    pokId: number;
    loading: any;
    pokDetail: IPokemonDetails = {
        name: '',
        weight: 0,
        height: 0,
        abilities: []
    };
    pokemon: Pokemon;
    isFavorite = true;

    constructor(
        private router: Router,
        private  route: ActivatedRoute,
        private loadingCtrl: LoadingController,
        private evt: Events,
        private pokData: PokDataProvider,
    ) {
        this.pokId = +route.snapshot.paramMap.get('id');
        const name = route.snapshot.queryParamMap.get('name');
        this.pokemon = new Pokemon(
            {
                name,
                url: environment.pokUrl + this.pokId +'/'
            }
        );

    }

    async presentLoading() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'bubbles'

        });
        return await this.loading.present();

    }

    async ngOnInit() {
        await this.presentLoading();
        this.pokDetail = await this.pokData
            .getPokemonDetails(this.pokId)
            .toPromise();

        console.log(this.pokDetail);
        this.loading.dismiss();
    }

    addToFavorite() {
        console.log('add to favorite');
        this.isFavorite = !this.isFavorite;
        const pok = new Pokemon({name: this.pokDetail.name, url: ''});
        this.pokData.addToFavorite(pok, this.isFavorite);

        this.evt.publish('favorite-added', this.pokDetail);
        this.router.navigate(['/pokemons/favorite']);

    }
}
