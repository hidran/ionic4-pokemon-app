import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPokemonResult} from '../../models/pokemon-results';
import {map, tap} from 'rxjs/operators';
import {IPokemonData} from '../../models/pokemon-data';
import {Pokemon} from '../../models/pokemon';
import {IPokemonDetails} from '../../models/pokemon-details';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn : 'root'
})
export class PokemonApiProvider {


    private limit = 100;
    pokUrl: string;
    constructor(public http: HttpClient) {
        this.pokUrl = environment.pokUrl;
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

    getPokemonDetails(pokId: number): Observable<IPokemonDetails> {

        return this.http.get<IPokemonDetails>(this.pokUrl + pokId).pipe(
            tap(res => {
                localStorage.setItem('pokemon-' + pokId, JSON.stringify(res));
            })
        );


    }


}
