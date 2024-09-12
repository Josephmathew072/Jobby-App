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
              key={eachItem.id}
              gettingTypeOfEmployment={gettingTypeOfEmployment}
            />
          ))}
        </ul>
        <hr />
      </div>
    )
  }

  gettingSalaray = () => {
    const {salaryRangesList, changeSalary} = this.props
    return (
      <div className="employment-container">
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="employment-list-container">
          {salaryRangesList.map(eachItem => (
            <SalaryItem
              eachItem={eachItem}
              key={eachItem.id}
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
        {this.gettingSalaray()}
      </div>
    )
  }
}

export default JobsFilterSection
