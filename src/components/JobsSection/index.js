import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobsFiterSection from '../JobsFilterSection'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobStatus = {
  initail: 'INITIAL',
  inProgeress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsSection extends Component {
  state = {
    jobList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: 0,
    jobStatusIs: jobStatus.initail,
  }

  componentDidMount() {
    this.gettingJobDetails()
  }

  gettingJobDetails = async () => {
    this.setState({
      jobStatusIs: jobStatus.inProgeress,
    })
    const {salaryRange, employmentType, searchInput} = this.state
    const fetchUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(fetchUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobList: updatedData,
        jobStatusIs: jobStatus.success,
      })
    } else {
      this.setState({
        jobStatusIs: jobStatus.failure,
      })
    }
  }

  keyDown = event => {
    if (event.key === 'Enter') {
      this.gettingJobDetails()
    }
  }

  displayLoadingView = () => (
    <div className="loading-container">
      {this.renderSearch()}
      <div className="job-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="search-lg-container ">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={this.getingSearchInput}
          onKeyDown={this.keyDown}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onKeyDown={this.keyDown}
        >
          {' '}
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  diisplayJobs = () => {
    const {jobList} = this.state
    return (
      <div className="jobs-profile-container">
        {jobList.length <= 0 ? (
          <div>
            {this.renderSearch()}
            <div className="no-job-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="no-jobs-image"
              />
              <h1 className="no-job-heading">No Jobs Found</h1>
              <p className="no-job-dis">
                We could not find any jobs. Try other filters
              </p>
            </div>
          </div>
        ) : (
          <div>
            {this.renderSearch()}
            <ul className="job-list-container">
              {jobList.map(eachItem => (
                <JobCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  gettingTypeOfEmployment = value => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, value]}),
      this.gettingJobDetails,
    )
  }

  changeSalary = salary => {
    this.setState({salaryRange: salary}, this.gettingJobDetails)
  }

  searchResults = () => {
    this.gettingJobDetails()
  }

  diisplayJobsFilter = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-sm-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.getingSearchInput}
            onKeyDown={this.keyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.searchResults}
          >
            {' '}
            <BsSearch className="search-icon" />
          </button>
        </div>
        <JobsFiterSection
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          gettingTypeOfEmployment={this.gettingTypeOfEmployment}
          changeSalary={this.changeSalary}
        />
      </>
    )
  }

  getingSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  displayFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failuer-heading">Oops! Something Went Wrong</h1>
      <p className="failuer-discrip">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.retryButton}
      >
        Retry
      </button>
    </div>
  )

  displayJobs = () => {
    const {jobStatusIs} = this.state
    switch (jobStatusIs) {
      case jobStatus.inProgeress:
        return this.displayLoadingView()
      case jobStatus.success:
        return this.diisplayJobs()
      case jobStatus.failure:
        return this.displayFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        {this.diisplayJobsFilter()}
        {this.displayJobs()}
      </div>
    )
  }
}
export default JobsSection
