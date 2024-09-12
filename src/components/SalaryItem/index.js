import './index.css'

const SalaryItem = props => {
  const {eachItem, changeSalary} = props
  const {salaryRangeId, label} = eachItem

  const sendingSalary = event => {
    changeSalary(event.target.value)
  }

  return (
    <li className="salary-item-container" onChange={sendingSalary}>
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        className="salary-input"
        name="salary-range"
      />
      <label htmlFor={salaryRangeId} className="salary-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryItem
