import {Injectable} from '@angular/core';
import {IPokemonDetails} from '../../models/pokemon-details';
import {Observable} from 'rxjs';
import {Pokemon} from '../../models/pokemon';
import {PokemonApiProvider} from '../pokemon-api/pokemon-api';
import {of} from 'rxjs';

/*
  Generated class for the PokDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
    providedIn : 'root'
})
export class PokDataProvider {

    constructor(private pokApi: PokemonApiProvider) {
        console.log('Hello PokDataProvider Provider');
    }

    getPokemons(): Observable<Pokemon[]> {

        if (localStorage.getItem('pokemons')) {
            const pokResults = JSON.parse(localStorage.getItem('pokemons'));
            if (pokResults) {
                return of(pokResults);
            }
        }

        return this.pokApi.getPokemons();

    }

    getPokemonDetails(pokId: number): Observable<IPokemonDetails> {
        const storageId = 'pokemon-' + pokId;
        if (localStorage.getItem(storageId)) {
            const pokResults = JSON.parse(localStorage.getItem(storageId));

            if (pokResults) {
                return of(pokResults);
            }
        }

        return this.pokApi.getPokemonDetails(pokId);


    }

    getFavoritePokemons(filter: string) {
        let favorites: Pokemon[] = [];
        if (localStorage.getItem('favorite-pokemons')) {
            const favoritesLocal = JSON.parse(localStorage.getItem('favorite-pokemons'));
            if (favoritesLocal) {
                favorites = favoritesLocal;
                if (filter) {
                    favorites = favorites.filter(res => res.name.startsWith(filter));
                }

            }
        }
        favorites.sort((a, b) => {
            if (a.name === b.name) {
                return 0;
            }
            return a.name > b.name ? 1 : -1;
        });

        return of(favorites);
    }

    addToFavorite(pok: Pokemon, add: boolean) {
        let favorites: Pokemon[] = [];

        if (localStorage.getItem('favorite-pokemons')) {
            const favoritesLocal = JSON.parse(localStorage.getItem('favorite-pokemons'));
            if (favoritesLocal) {
                favorites = favoritesLocal;

            }
        }
        if (add) {
            favorites.push(pok);
        } else {
            favorites = favorites.filter(res => res.name !== pok.name);
        }

        console.log(favorites);
        localStorage.setItem('favorite-pokemons', JSON.stringify(favorites));
        console.log('add to favorite localstorage');
    }
}
