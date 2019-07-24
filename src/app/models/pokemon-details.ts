interface IAbility {
    name: string;
    url: string;
}

interface PokemonAbility {
    ability: IAbility;
    slot: number;
    is_hiden: boolean;

}

export interface IPokemonDetails {
    name: string;
    weight: number;
    height: number;
    abilities: Array<PokemonAbility>;

}
