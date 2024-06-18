import Container from "../../components/Container"
import FormPokemon from "../../components/FormPokemon"

const CreatePokemon = () => {
  return (
    <div className="bg-[url(https://i.pinimg.com/564x/2b/1d/fe/2b1dfec19b945a19ac39641278a6a799.jpg)] bg-cover bg-center w-full h-screen before:w-screen before:h-screen before:absolute before:bg-white/75 before:backdrop-blur-md before:con">
      <div className="relative z-1">
        <Container className="shadow-sm">
          <div className="bg-[url(https://i.pinimg.com/564x/2b/1d/fe/2b1dfec19b945a19ac39641278a6a799.jpg)] bg-cover w-full h-32 md:h-[200px] bg-center"></div>
          <FormPokemon />
        </Container>
      </div>
    </div>
  )
}

export default CreatePokemon
