import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    location,
    title,
  } = eachItem
  return (
    <li className="similar-similar-cotainer">
      <div className="similar-details-company-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-image"
        />
        <div>
          <h1 className="similar-company-name">{title}</h1>
          <div className="similar-company-rating-container">
            <BsFillStarFill className="job-rating-star" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Job Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobs
