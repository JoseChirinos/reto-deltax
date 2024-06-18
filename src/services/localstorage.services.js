export {}

export function addPokemon(pokemonData) {
  const currentList = listPokemon() || []
  currentList.push(pokemonData)
  if(validation(pokemonData)) {
    throw "Ya existe el ID"
  } else {
    localStorage.setItem('pokemonList', JSON.stringify(currentList))
  }
}

function validation(pokemonData) {
  const currentList = listPokemon() || []
  const indexPokemon = currentList.findIndex(pokemon => pokemon.id === pokemonData.id)
  return indexPokemon >= 0

}

export function removePokemon(id) {
  const currentList = listPokemon() || []
  const indexPokemon = currentList.findIndex(pokemon => pokemon.id === id)
  if (indexPokemon >= 0) {
    currentList.splice(indexPokemon, 1)
    localStorage.setItem('pokemonList', JSON.stringify(currentList))
  }

}

export function listPokemon() {
  const currentList = localStorage.getItem("pokemonList")
  if(currentList) {
    const formattedList = JSON.parse(currentList) || []
    return formattedList
  }
  return []
}

export function getPokemon(id) {
  const currentList = listPokemon() || []
  const pokemon = currentList.find(pokemon => pokemon.id === id)
  if (pokemon) {
    return pokemon
  }
  return null
}

export function setPokemon(id, modifiedPokemon) {
  let currentList = listPokemon() || []
  const indexPokemon = currentList.findIndex(pokemon => pokemon.id === id)
  if (indexPokemon >= 0) {
    currentList[indexPokemon] = modifiedPokemon
  }
}