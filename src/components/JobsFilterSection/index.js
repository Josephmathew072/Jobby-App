import {Component} from 'react'
import UserProfile from '../UserProfile'
import EmploymentItem from '../EmploymentItem'
import SalaryItem from '../SalaryItem'
import './index.css'

class JobsFilterSection extends Component {
  gettingEmployment = () => {
    const {employmentTypesList, gettingTypeOfEmployment} = this.props
    return (
      <div className="employment-container">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-list-container">
          {employmentTypesList.map(eachItem => (
            <EmploymentItem
              eachItem={eachItem}
              key={eachItem.employmentTypeId} // Changed to use unique employmentTypeId
              gettingTypeOfEmployment={gettingTypeOfEmployment}
            />
          ))}
        </ul>
        <hr />
      </div>
    )
  }

  gettingSalary = () => {
    const {salaryRangesList, changeSalary} = this.props
    return (
      <div className="salary-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-list-container">
          {salaryRangesList.map(eachItem => (
            <SalaryItem
              eachItem={eachItem}
              key={eachItem.salaryRangeId} // Changed to use unique salaryRangeId
              changeSalary={changeSalary}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="job-filter-section-container">
        <UserProfile />
        <hr />
        {this.gettingEmployment()}
        {this.gettingSalary()}
      </div>
    )
  }
}

export default JobsFilterSection
