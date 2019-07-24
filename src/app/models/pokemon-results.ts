 import { IPokemonData} from './pokemon-data';

 export  interface IPokemonResult {
    count: number;
    previous: string;
    results: [IPokemonData];
    next: string;
}

