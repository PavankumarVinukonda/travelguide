import './index.css'

const TravelItem = props => {
  const {data} = props
  const {id, description, imageUrl, name} = data
  return (
    <li className="list-element">
      <img src={imageUrl} alt={name} className="travel-img" />
      <div className="data-container">
        <h1 className="heading">{name}</h1>
        <p className="paragraph">{description}</p>
      </div>
    </li>
  )
}

export default TravelItem
