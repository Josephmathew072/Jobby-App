import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {HiHome} from 'react-icons/hi'
import {BsBriefcaseFill, BsBoxArrowRight} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <div className="jobby-header-container">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-logo-image"
          />
        </Link>

        <ul className="nav-items-container">
          <Link to="/" className="link-item">
            <li className="nav-list-item">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="nav-list-item">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="nav-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <ul className="sm-items">
          <Link to="/">
            <li>
              <HiHome className="button-element" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsBriefcaseFill className="button-element" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="button-item"
              onClick={onClickLogout}
            >
              {' '}
              <BsBoxArrowRight className="button-element" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
