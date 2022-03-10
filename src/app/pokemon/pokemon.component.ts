import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pkm-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemonList?: PokemonList;

  constructor(private http: HttpClient) { 
    this.pokemonList = undefined;
  }

  ngOnInit(): void {
  }

  pushPokemons(generation: number){
    let pokemon: PokemonGeneration | undefined;
    switch(generation){
      case 1:
        pokemon = {first: 0, last: 150}
        break;
      case 2:
        pokemon = {first: 151, last: 250}
        
        break;
      case 3:
        pokemon = {first: 251, last: 385}
        break;
        default:
          pokemon = undefined;
          break;
    }

    if(pokemon == undefined){
      alert("Valor desconhecido");
      return;
    }

    this.getList(pokemon).subscribe(e =>{
      this.pokemonList = e;
    })
  }

  buttonConsole(){
    console.log(this.pokemonList)
  }

  getList(pokemon: PokemonGeneration):Observable<PokemonList>{
    return this.http.get<PokemonList>("https://pokeapi.co/api/v2/pokemon?limit="+(pokemon.last - pokemon.first + 1)+ "&offset=" + pokemon.first);
  }

}


export interface PokemonGeneration{
  first: number;
  last: number;
}

export interface PokemonResult{
  name: string;
  url: string;
}

export interface PokemonList{
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}