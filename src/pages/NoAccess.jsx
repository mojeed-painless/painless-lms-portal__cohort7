import { Link } from 'react-router-dom';
import '../assets/styles/layout.css';
import '../assets/styles/no-access.css';
import pcalogo from '../assets/pcalogo.png';
import { FaHandPointLeft } from 'react-icons/fa';
import { ShieldX, Sparkles } from 'lucide-react';

export default function NoAccess() {
  return (
    <div className="no-access">
      <nav>
        <div className="nav__left">
          <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
          </div>
        </div>

        <div className="nav__right"></div>
      </nav>

      <div className="upgrade-wrapper">
        <div className="error-column">
          <div className="error-content">
            <div className="icon-shield">
              <span className="shield-x">
                <ShieldX size={55} />
              </span>
            </div>

            <h1>Oops!</h1>

            <h2>
              Calm down! Study and perfect the available contents. Others will be releaes shortly
            </h2>

            <div className="link-container">
              <span>
                <FaHandPointLeft />
              </span>
              <Link to="/" className="not-found-link">
                Go back to Home page
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
