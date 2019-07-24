import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPokemonResult} from '../../models/pokemon-results';
import {map, tap} from 'rxjs/operators';
import {IPokemonData} from '../../models/pokemon-data';
import {Pokemon} from '../../models/pokemon';
import {IPokemonDetails} from '../../models/pokemon-details';


@Injectable({
    providedIn : 'root'
})
export class PokemonApiProvider {

    pokUrl = 'https://pokeapi.co/api/v2/pokemon/';
    private limit = 100;

    constructor(public http: HttpClient) {
        console.log('Hello PokemonApiProvider Provider');
    }

    getPokemons(): Observable<Pokemon[]> {

        return this.http.get<IPokemonResult>(this.pokUrl + '?limit=' + this.limit).pipe(
            map((res: IPokemonResult) => res.results),


            map((res: [IPokemonData]) => {
                return res.map(pokData => new Pokemon(pokData));
            }),
            tap(res => {
                localStorage.setItem('pokemons', JSON.stringify(res));
            })
        );

    }

    getPokemonDetails(pok: Pokemon): Observable<IPokemonDetails> {

        return this.http.get<IPokemonDetails>(this.pokUrl + pok.id).pipe(
            tap(res => {
                localStorage.setItem('pokemon-' + pok.name, JSON.stringify(res));
            })
        );


    }


}
