import { useForm } from "react-hook-form"
import { addPokemon } from "../services/localstorage.services"
import { useEffect, useState } from "react"
import { getPokemonTypesService } from "../services/pokemon.service"
import PokeballIcon from '../assets/pokeball.svg'
import { NavLink } from "react-router-dom"
import { Bounce, toast } from "react-toastify"

const FormPokemon = () => {
  const [typesData, setTypesData] = useState([])
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const pokemon = {
      id: data.idPokemon,
      name: data.namePokemon,
      type: data.typePokemon,
      size: data.sizePokemon,
      gender: data.genderPokemon,
    }
    try {
      addPokemon(pokemon)
      toast('🦄 Guardado con exito!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      reset()
    } catch(e) {
      setError("idPokemon", {
        message: e
      })
    }
  }

  const handleGetTypes = async ()=> {
    const types = await getPokemonTypesService()

    setTypesData(types.results)
  }

  useEffect(()=>{
    handleGetTypes()
  },[])

  return (
    <div className="w-full bg-white p-8">
      <div className="flex justify-center items-center">
        <img src={PokeballIcon} alt="pokeball" className="w-16 h-16" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <section>
          <label htmlFor="" className="font-medium">
            Identificador: <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="ID"
            {...register("idPokemon", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
              pattern: {
                value: /[0-9]/,
                message: "tienen que ser numeros"
              }
            })}
            className="w-full p-2 bg-gray-300/25 rounded-lg"
          />
          {errors.idPokemon && <span className="text-red-500">(!) {errors.idPokemon.message} </span>}
        </section>
        <section>
          <label htmlFor="" className="font-medium">
            Nombre: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("namePokemon",{
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
            className="w-full p-2 bg-gray-300/25 rounded-lg"
          />
          {errors.namePokemon && <span className="text-red-500">(!) {errors.namePokemon.message} </span>}
        </section>
        <section>
          <label htmlFor="" className="font-medium">
            Tipo: <span className="text-red-500">*</span>
          </label>
          <select
            placeholder="Seleccione Tipo"
            {...register("typePokemon", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
            className="w-full p-2 bg-gray-300/25 rounded-lg"
          >
            <option value="">Seleccione un tipo</option>
            {
              typesData.map((type, index) => (
                <option key={`option-${index}`}>{type.name}</option>
              ))
            }
          </select>
          {errors.typePokemon && <span className="text-red-500">(!) {errors.typePokemon.message} </span>}
        </section>
        <section>
          <label htmlFor="" className="font-medium">
            Tamaño: <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Tamaño"
            {...register("sizePokemon", {
              required: {
                value: true,
                message: "Este campo es obligatorio",
              },
            })}
            className="w-full p-2 bg-gray-300/25 rounded-lg"
          />
          {errors.sizePokemon && <span className="text-red-500">(!) {errors.sizePokemon.message} </span>}
        </section>
        <section className="flex flex-col">
          <label htmlFor="" className="font-medium">
            Genero: <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label htmlFor="pokemon-male" className="flex gap-2">
              <input
                type="radio"
                id="pokemon-male"
                value="male"
                name="genderPokemon"
                {...register("genderPokemon", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
              />
              Macho
            </label>
            <label htmlFor="pokemon-female" className="flex gap-2">
              <input
                type="radio"
                id="pokemon-female"
                value="female"
                name="genderPokemon"
                {...register("genderPokemon", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
              />
              Hembra
            </label>
          </div>
          <br />
          {errors.genderPokemon && <span className="text-red-500">(!) {errors.genderPokemon.message} </span>}
        </section>

        <div className="flex gap-4 justify-start items-center">
          <NavLink to="/" type="button">Cancelar</NavLink>
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-blue-700 text-white p-2 px-8 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPokemon
