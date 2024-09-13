import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobsFilterSection from '../JobsFilterSection'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const jobStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobsSection = () => {
  const [jobList, setJobList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [employmentType, setEmploymentType] = useState([])
  const [salaryRange, setSalaryRange] = useState(0)
  const [jobStatusIs, setJobStatusIs] = useState(jobStatus.initial)

  const gettingJobDetails = useCallback(async () => {
    setJobStatusIs(jobStatus.inProgress)
    const fetchUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(fetchUrl, options)
      if (response.ok) {
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
        setJobList(updatedData)
        setJobStatusIs(jobStatus.success)
      } else {
        setJobStatusIs(jobStatus.failure)
      }
    } catch (error) {
      setJobStatusIs(jobStatus.failure)
    }
  }, [employmentType, salaryRange, searchInput])

  useEffect(() => {
    gettingJobDetails()
  }, [gettingJobDetails])

  const handleSearchInputChange = event => setSearchInput(event.target.value)

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      gettingJobDetails()
    }
  }

  const searchResults = () => {
    gettingJobDetails()
  }

  const gettingTypeOfEmployment = useCallback(value => {
    setEmploymentType(prev => [...prev, value])
  }, [])

  const changeSalary = useCallback(salary => {
    setSalaryRange(salary)
  }, [])

  const renderSearch = () => (
    <div className="search-lg-container">
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        value={searchInput}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-button"
        onClick={searchResults}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const displayLoadingView = () => (
    <div className="loading-container">
      {renderSearch()}
      <div className="job-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  const displayJobs = () => {
    if (jobStatusIs === jobStatus.inProgress) {
      return displayLoadingView()
    }
    if (jobStatusIs === jobStatus.success) {
      return (
        <div className="jobs-profile-container">
          {jobList.length === 0 ? (
            <div>
              {renderSearch()}
              <div className="no-job-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="no-jobs-image"
                />
                <h1 className="no-job-heading">No Jobs Found</h1>
                <p className="no-job-dis">
                  We could not find any jobs. Try other filters.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {renderSearch()}
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
    if (jobStatusIs === jobStatus.failure) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-view-image"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-description">
            We cannot seem to find the page you are looking for.
          </p>
          <button
            type="button"
            className="failure-button"
            onClick={gettingJobDetails}
          >
            Retry
          </button>
        </div>
      )
    }
    return null
  }

  const displayJobsFilter = () => (
    <>
      <div className="search-sm-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={searchResults}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      <JobsFilterSection
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        gettingTypeOfEmployment={gettingTypeOfEmployment}
        changeSalary={changeSalary}
      />
    </>
  )

  return (
    <div className="jobs-container">
      {displayJobsFilter()}
      {displayJobs()}
    </div>
  )
}

export default JobsSection
