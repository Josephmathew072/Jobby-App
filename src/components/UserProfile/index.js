import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const userStatus = {
  initail: 'INITIAL',
  inProgeress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userDetails: [], userStatusIs: userStatus.initail}

  componentDidMount() {
    this.gettingUserDetails()
  }

  gettingUserDetails = async () => {
    this.setState({userStatusIs: userStatus.inProgeress})
    const jwtToken = Cookies.get('jwt_token')
    const fetchUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(fetchUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        userDetails: updatedProfileDetails,
        userStatusIs: userStatus.success,
      })
    } else {
      this.setState({
        userStatusIs: userStatus.failure,
      })
    }
  }

  displayLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  fetchingUserDetails = () => {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails
    return (
      <div className="user-details-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  retryProfile = () => {
    this.gettingUserDetails()
  }

  displayFailureview = () => (
    <div className="user-details-container">
      <button
        className="failure-button-user"
        type="button"
        testid="button"
        onClick={this.retryProfile}
      >
        Retry
      </button>
    </div>
  )

  displayUserProfile = () => {
    const {userStatusIs} = this.state
    switch (userStatusIs) {
      case userStatus.success:
        return this.fetchingUserDetails()
      case userStatus.inProgeress:
        return this.displayLoadingView()
      case userStatus.failure:
        return this.displayFailureview()
      default:
        return null
    }
  }

  render() {
    return <div>{this.displayUserProfile()}</div>
  }
}

export default UserProfile
