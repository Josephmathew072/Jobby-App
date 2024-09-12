import './index.css'

const EmploymentItem = props => {
  const {eachItem, gettingTypeOfEmployment} = props
  const {label, employmentTypeId} = eachItem

  const sendingEmploymentValue = event => {
    console.log(event.target.value)
    gettingTypeOfEmployment(event.target.value)
  }

  return (
    <li className="employment-item-container" onChange={sendingEmploymentValue}>
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        className="employment-input"
      />
      <label htmlFor={employmentTypeId} className="employment-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentItem
