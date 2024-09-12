import './index.css'

const SkillCard = props => {
  const {eachItem} = props
  const {imageUrl, name} = eachItem
  return (
    <li className="skill-item-container">
      <img src={imageUrl} alt={name} className="skill-card" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillCard
