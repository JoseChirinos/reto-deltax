import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { getPokemon } from '../../../services/localstorage.services'
import { getPokemonService } from '../../../services/pokemon.service'
import { NavLink, useNavigate } from 'react-router-dom'

const ModalPokemon = ({
  id,
  isLocal
}) => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const handleData = async () => {
    if(isLocal) {
      const pokemon = getPokemon(id)
      setData(pokemon)
    } else {
      const pokemon = await getPokemonService("https://pokeapi.co/api/v2/pokemon/"+id)
      setData(pokemon)
    }
  }
  const handleCloseModal = (e) => {
    const modalElementClicked = e?.target
    const modalElementClassName = String(modalElementClicked.className)
    if (modalElementClassName?.includes("modal")) {
      navigate("./")
    }
  }

  useEffect(()=> {
    handleData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="fixed w-full h-screen z-20 bg-black/75 flex justify-center items-center modal" onClick={handleCloseModal}>
      {
        data && (
          <div className="bg-white w-1/2 h-auto flex flex-col justify-center items-center shadow-md rounded-md p-8">
            <h1 className='text-xl font-medium'>{data.name}</h1>
            {
              isLocal ? (
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Ml0U8n2oGdpGKb3IHxF5q7bKLFEaChF3mA&s`}
                  alt={name}
                  className="w-1/2 h-1/2"
                />
              ):(
                <img
                  src={data.sprites?.other?.home?.front_default}
                  alt={name}
                  className="w-1/2 h-1/2"
                />
              )
            }
            <NavLink to="/" className="underline border-[1px] border-black/45 p-2 px-4 rounded-md">Cerrar</NavLink>
          </div>
        )
      }
    </div>
  )
}

ModalPokemon.propTypes = {
  id: PropTypes.string.isRequired,
  isLocal: PropTypes.bool.isRequired
}
export default ModalPokemon
