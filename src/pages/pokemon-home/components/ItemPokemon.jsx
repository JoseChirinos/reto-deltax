import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const ItemPokemon = ({
  id,
  name,
  image,
  isLocal
}) => {
  return (
    <NavLink to={`/?view=${id}&local=${isLocal}`} className="block w-36 bg-white shadow-md">
      <div className="bg-[whitesmoke] w-36 h-24 flex justify-center items-center">
        <img src={image} alt={name} className="w-16 h-16"/>
      </div>
      <div className="flex justify-center items-center p-2">
        {name}
      </div>
    </NavLink>
  )
}

ItemPokemon.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLocal: PropTypes.bool
}

ItemPokemon.defaultProps = {
  isLocal: false
}

export default ItemPokemon
