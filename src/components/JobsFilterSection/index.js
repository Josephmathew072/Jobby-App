import UserProfile from '../UserProfile'
import EmploymentItem from '../EmploymentItem'
import SalaryItem from '../SalaryItem'
import './index.css'

const JobsFilterSection = ({
  employmentTypesList,
  salaryRangesList,
  gettingTypeOfEmployment,
  changeSalary,
}) => {
  const gettingEmployment = () => (
    <div className="employment-container">
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachItem => (
          <EmploymentItem
            eachItem={eachItem}
            key={eachItem.employmentTypeId} // Use unique employmentTypeId
            gettingTypeOfEmployment={gettingTypeOfEmployment}
          />
        ))}
      </ul>
      <hr />
    </div>
  )

  const gettingSalary = () => (
    <div className="salary-container">
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(eachItem => (
          <SalaryItem
            eachItem={eachItem}
            key={eachItem.salaryRangeId} // Use unique salaryRangeId
            changeSalary={changeSalary}
          />
        ))}
      </ul>
    </div>
  )

  return (
    <div className="job-filter-section-container">
      <UserProfile />
      <hr />
      {gettingEmployment()}
      {gettingSalary()}
    </div>
  )
}

export default JobsFilterSection
