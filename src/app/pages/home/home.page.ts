import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon';
import {PokDataProvider} from '../../services/pok-data/pok-data';
import {LoadingController} from '@ionic/angular';
import {Events} from '@ionic/angular';
import {IPokemonDetails} from '../../models/pokemon-details';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    pokemons: Pokemon[];
    allpoks: Pokemon[];

    loading: any;


    constructor(private pokApi: PokDataProvider,
                private loadingCtrl: LoadingController,
                private  evt: Events,
                private router: Router,
                private route: ActivatedRoute
                ) {
        this.evt.subscribe('pok-searched', res => {
            this.filterPoks(res);
        });


    }

    ngOnInit(): void {
        this.presentLoading().then(
            () => this.getPokemons()
        );


    }

    async presentLoading() {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'bubbles'

        });
        return await this.loading.present();

    }

    getPokemons() {
        this.pokApi.getPokemons().subscribe((res: [Pokemon]) => {
                this.loading.dismiss();
                this.pokemons = res.sort((a, b) => {
                    if (a.name === b.name) {
                        return 0;
                    }
                    return a.name > b.name ? 1 : -1;
                });
                this.allpoks = this.pokemons.slice();
                console.log(this.allpoks);
            }
        );
    }

    showPokDetail(pok: Pokemon) {
 // this.router.navigateByUrl('pokemons/home/pokemon-detail/' + pok.id);
       /* this.router.navigate(['pokemon-detail', pok.id],
            {relativeTo: this.route}
            );
            */




    }

    filterPoks(text: string) {
        if (text.length === 0) {
            this.pokemons = this.allpoks;
            return;
        }
        this.pokemons = this.pokemons.filter(pok => pok.name.startsWith(text));
    }

}
