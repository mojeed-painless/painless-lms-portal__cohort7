import {Link} from 'react-router-dom';
import '../assets/styles/layout.css';
import '../assets/styles/not-found.css';
import pcalogo from '../assets/pcalogo.png';
import notFound from '../assets/not-found.png'
import { FaHandPointLeft } from "react-icons/fa";


export default function NotFoundScreen() {
    return (
            <div className="not-found">
                <nav>
                    <div className="nav__left">
                      <div className="nav-logo">
                        <img src={pcalogo} alt="academy logo" />
                      </div>
                    </div>
                        
                    <div className="nav__right"></div>
                </nav>

                <div className="not-found-body">
                    <div className="not-found-image">
                        <img src={notFound} alt="404 not found" />
                    </div>

                    <h2>We can’t find the page you’re looking for</h2>

                    <div className="link-container">
                        <span><FaHandPointLeft /></span>
                        <Link to="/" className='not-found-link'>Go back to Home page</Link> 
                    </div>
                </div>
                
            </div>
    )
}