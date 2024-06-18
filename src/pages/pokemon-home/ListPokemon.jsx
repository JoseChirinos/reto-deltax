import { useEffect, useState } from "react"
import { getPokemonService, listPokemonService } from "../../services/pokemon.service"
import ItemPokemon from "./components/ItemPokemon"
import { NavLink, useSearchParams } from "react-router-dom"
import { listPokemon } from "../../services/localstorage.services"
import ModalPokemon from "./components/ModalPokemon"
import Container from "../../components/Container"
import PokeballIcon from '../../assets/pokeball.svg'

const TABS = {
  NACIONAL: "NACIONAL",
  TUMBO: "TUMBO"
}
const ListPokemon = () => {
  const [searchParams] = useSearchParams();
  const viewId = searchParams.get("view")
  const isLocal = searchParams.get("local") === "true"

  const [pokemonList, setPokemonList] = useState([])
  const [pokemonLocalList, setPokemonLocalList] = useState([])
  const [tab, setTab] = useState(TABS.NACIONAL)

  const handleGetPokemons = async () => {
    try {
      const listPokemonsResponse = await listPokemonService()
      handleGetIndividualData(listPokemonsResponse.results)
    } catch(e) {
      console.log(e)
    }
  }

  const handleGetIndividualData = async (list) => {
    try {
      const datas = []
      list.forEach(element => {
        datas.push(getPokemonService(element.url))       
      })
      const results = await Promise.all(datas)
      setPokemonList(results)
    } catch (e) {
      console.log(e)
    }
  }

  const handleGetPokemonsLocal = () => {
    setPokemonLocalList(listPokemon())
  }

  const changeTab = (value) => {
    setTab(value)
  }
  useEffect(() => {
    if (pokemonList.length <= 0) {
      handleGetPokemons()
    }
    if (pokemonLocalList.length <= 0) {
      handleGetPokemonsLocal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="bg-black/95 flex justify-center text-white">
        <a href="https://josechirinos.dev/" target="_blank" rel="noopener noreferrer">Jose Chirinos</a>
      </div>
      { viewId && (
        <ModalPokemon id={viewId} isLocal={isLocal} />
      )}
      <Container>
        <div className="w-full flex justify-center gap-2">
          <button
            type="button"
            onClick={() => changeTab(TABS.NACIONAL)}
            className={`w-1/2 p-4 text-lg ${tab === TABS.NACIONAL && 'bg-[#fcfcca]'}`}
          >
            POKEDEX NACIONAL
          </button>
          <button
            type="button"
            onClick={() => changeTab(TABS.TUMBO)}
            className={`w-1/2 p-4 text-lg ${tab === TABS.TUMBO && 'bg-[#fcfcca]'}`}
          >
            POKEDEX TUMBO
          </button>
        </div>
      </Container>
      <div className="h-8"></div>
      {
        tab === TABS.NACIONAL && (
          <Container>
            <div className="flex flex-wrap gap-2 justify-center">
              {pokemonList.map((pokemon, index) => (
                <ItemPokemon
                  key={`pokemon${index}`}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon?.sprites?.other?.home?.front_default}
                />
              ))}
            </div>
          </Container>
        )
      }
      {
        tab === TABS.TUMBO && (
          <div className="flex flex-col gap-4">
            <Container>
              <div className="flex justify-center">
                <NavLink
                  to="/create"
                  className="group flex justify-center items-center gap-2 bg-blue-700 text-white p-2 px-8 rounded-lg"
                >
                  Crear
                  <img src={PokeballIcon} alt="pokeball" className="group w-8 h-8 group-hover:rotate-[360deg] transition-all duration-[1s]" />
                </NavLink>
              </div>
            </Container>
            <Container>
              <div className="flex flex-wrap gap-2 justify-center">
                {pokemonLocalList.map((pokemon, index) => (
                  <ItemPokemon
                    key={`pokemon${index}`}
                    isLocal
                    id={pokemon.id}
                    name={pokemon.name}
                    image={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Ml0U8n2oGdpGKb3IHxF5q7bKLFEaChF3mA&s`}
                  />
                ))}
              </div>  
            </Container>       
          </div>
        )
      }
    </div>
  )
}

export default ListPokemon
