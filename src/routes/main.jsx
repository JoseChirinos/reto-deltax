import {
  createBrowserRouter,
} from "react-router-dom";
import CreatePokemon from "../pages/pokemon-create/CreatePokemon";
import ListPokemon from "../pages/pokemon-home/ListPokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPokemon />,
  },
  {
    path: "/create",
    element: <CreatePokemon />,
  },
]);

export default router
