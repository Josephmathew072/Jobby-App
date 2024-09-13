import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const jobDetailsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobDetails = props => {
  const [jobDetailsList, setJobDetailsList] = useState({})
  const [similarJobList, setSimilarJobList] = useState([])
  const [jobStatus, setJobStatus] = useState(jobDetailsStatus.initial)

  const gettingUpdatedJobDetails = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    title: jobDetails.title,
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    rating: jobDetails.rating,
    packagePerAnnum: jobDetails.package_per_annum,
    skills: jobDetails.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  const gettingUpdatedSimilarDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  const gettingJobDetails = useCallback(async () => {
    setJobStatus(jobDetailsStatus.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const {match} = props
      const {params} = match
      const {id} = params
      const fetchUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(fetchUrl, options)

      if (response.ok) {
        const data = await response.json()
        const jobDetails = data.job_details
        const similarDetails = data.similar_jobs
        const updatedJobDetails = gettingUpdatedJobDetails(jobDetails)
        const updatedSimilarDetails = similarDetails.map(eachItem =>
          gettingUpdatedSimilarDetails(eachItem),
        )

        setJobDetailsList(updatedJobDetails)
        setSimilarJobList(updatedSimilarDetails)
        setJobStatus(jobDetailsStatus.success)
      } else {
        setJobStatus(jobDetailsStatus.failure)
      }
    } catch (error) {
      setJobStatus(jobDetailsStatus.failure)
    }
  }, [props])

  useEffect(() => {
    gettingJobDetails()
  }, [gettingJobDetails])

  const gettingJobDescription = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobDetailsList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <div className="job-description-container">
          <div className="job-details-company-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-company-image"
            />
            <div>
              <h1 className="job-company-name">{title}</h1>
              <div className="job-company-rating-container">
                <BsFillStarFill className="job-rating-star" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="icon-package-container">
            <div className="icon-display-container">
              <div className="icons-container">
                <MdLocationOn className="icon-style" />
                <p className="icon-description">{location}</p>
              </div>
              <div className="icons-container">
                <BsBriefcaseFill className="icon-style" />
                <p className="icon-description">{employmentType}</p>
              </div>
            </div>
            <p className="package-description">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="anchor-container">
            <h1 className="description">Description</h1>
            <a className="anchor-tag" href={companyWebsiteUrl}>
              Visit <BiLinkExternal className="redirect-icon" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachItem => (
              <SkillCard eachItem={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="life-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life_at_company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs">Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobList.map(eachItem => (
            <SimilarJobs eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const retryButton = () => {
    gettingJobDetails()
  }

  const renderFailureView = () => (
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
      <button type="button" className="failure-button" onClick={retryButton}>
        Retry
      </button>
    </div>
  )

  const renderJobDetails = () => {
    switch (jobStatus) {
      case jobDetailsStatus.inProgress:
        return renderLoadingView()
      case jobDetailsStatus.success:
        return gettingJobDescription()
      case jobDetailsStatus.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="job-detail-container">{renderJobDetails()}</div>
    </div>
  )
}

export default JobDetails
