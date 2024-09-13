import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const userStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

function UserProfile() {
  const [userDetails, setUserDetails] = useState({})
  const [userStatusIs, setUserStatusIs] = useState(userStatus.initial)

  const fetchData = async () => {
    setUserStatusIs(userStatus.inProgress)
    try {
      const jwtToken = Cookies.get('jwt_token')
      const fetchUrl = 'https://apis.ccbp.in/profile'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(fetchUrl, options)
      if (response.ok) {
        const data = await response.json()
        const profileDetails = data.profile_details
        const updatedProfileDetails = {
          name: profileDetails.name,
          profileImageUrl: profileDetails.profile_image_url,
          shortBio: profileDetails.short_bio,
        }
        setUserDetails(updatedProfileDetails)
        setUserStatusIs(userStatus.success)
      } else {
        setUserStatusIs(userStatus.failure)
      }
    } catch (error) {
      setUserStatusIs(userStatus.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const displayLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  const displayFailureView = () => (
    <div className="user-details-container">
      <button
        className="failure-button-user"
        type="button"
        data-testid="button"
        onClick={fetchData}
      >
        Retry
      </button>
    </div>
  )

  const displayUserProfile = () => {
    switch (userStatusIs) {
      case userStatus.success:
        return (
          <div className="user-details-container">
            <img src={userDetails.profileImageUrl} alt="profile" />
            <h1 className="user-name">{userDetails.name}</h1>
            <p className="user-bio">{userDetails.shortBio}</p>
          </div>
        )
      case userStatus.inProgress:
        return displayLoadingView()
      case userStatus.failure:
        return displayFailureView()
      default:
        return null
    }
  }

  return <div>{displayUserProfile()}</div>
}

export default UserProfile
