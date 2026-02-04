import {Link} from 'react-router-dom';
import '../assets/styles/layout.css';
import '../assets/styles/no-access.css';
import pcalogo from '../assets/pcalogo.png';
import { FaHandPointLeft } from "react-icons/fa";
import {
    ShieldX,
    Sparkles,
} from 'lucide-react';


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
                                <span className="shield-x"><ShieldX size={55}/></span>
                            </div>

                            <h1>Oops!</h1>

                            <h2>Seems you don't have access to this page</h2>
                            
                            <p>
                                This content is reserved for paid members. Upgrade your 
                                plan to unlock full access to all features.
                            </p>

                            <div className="premium-label">
                                <span>🔒 Paid Content</span>
                            </div>

                            <div className="link-container">
                                <span><FaHandPointLeft /></span>
                                <Link to="/" className='not-found-link'>Go back to Home page</Link> 
                            </div>
                        </div>
                    </div>

                    
                    {/* <div className="pricing-column">
                        <div className="pricing-header">
                            <span className="badge-sparkle">
                                <span><Sparkles size={15}/></span> 
                                Upgrade Now
                            </span>
                            <h1>Unlock Full Access</h1>
                            <p>Get unlimited access to all paid features and take your experience to the next level.</p>
                        </div>

                        <div className="pricing-card">
                            <div className="price-box">
                                <span>Pay only: &#8358; 5,000</span>
                            </div>

                            <ul className="features-list">
                                <li><span className="check">✓</span> Life time access to the Basic content</li>
                                <li><span className="check">✓</span> Direct mentorship from the instructor</li>
                                <li><span className="check">✓</span> Build projects you can showcase to clients</li>
                                <li><span className="check">✓</span> Exclusive access to our private student community</li>
                                <li><span className="check">✓</span> Regular updates and new content</li>
                                <li><span className="check">✓</span> Certification</li>
                            </ul>

                            <button className="subscribe-btn">
                                <span className="bolt">⚡</span> 
                                Apply Now
                            </button>
                        </div>
                    </div> */}
                    </div>
                </div>
                
    )
}