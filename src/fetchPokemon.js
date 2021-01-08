import * as Pokedex from 'pokeapi-js-wrapper';

const P = new Pokedex.Pokedex();

export const getGenI = async () => {
  const pokemon = await P.getPokedexByName('kanto');
  return pokemon.pokemon_entries;
};

export const getPokemon = async (id) => {
  const pokemon = await P.getPokemonByName(id);
  return { ...pokemon, types: pokemon.types.reverse() };
};

export const getSpecies = async (id) => {
  const pokemon = await P.getPokemonSpeciesByName(id);
  return pokemon;
};
