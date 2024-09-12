import {Link} from 'react-router-dom'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachItem
  return (
    <Link to={`/jobs/${id}`} className="link-container">
      <li className="job-card-item">
        <div className="job-title-container">
          <img
            src={companyLogoUrl}
            className="job-card-image"
            alt="company logo"
          />
          <div>
            <h1 className="job-heading ">{title}</h1>
            <div className="job-rating-container">
              <BsFillStarFill className="rating-star" />
              <p className="rating"> {rating}</p>
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
          <p className="package-description">{packagePerAnnum} </p>
        </div>
        <hr className="hroizantal-line" />
        <h1 className="description">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
