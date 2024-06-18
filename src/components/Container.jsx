import PropTypes from 'prop-types'
const Container = ({
  children,
  className
}) => {
  return (
    <div className={`m-auto left-0 right-0 w-full md:w-[760px] ${className}`}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string
}



export default Container
