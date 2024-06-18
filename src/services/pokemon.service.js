import { POKEMON_API, POKEMON_API_TYPES } from "../constants/pokemon.constants";

export {}

export async function listPokemonService() {
  const response = await fetch(POKEMON_API);
  const data = await response.json()
  return data
}

export async function getPokemonService(url) {
  const response = await fetch(url);
  const data = await response.json()
  return data
}

export async function getPokemonTypesService() {
  const response = await fetch(POKEMON_API_TYPES);
  const data = await response.json()
  return data
}