import '../../assets/styles/course-content.css';
import '../../assets/styles/transition.css';
import jsLogo from '../../assets/js_logo.png';
import transitImg from '../../assets/transit1.png';
import PrevNextBtn from '../../components/common/PrevNextBtn';

export default function JSTransition() {

    return (
        <section className="course-content transition-content">
            <div className="transition-card">
                <span className="badge">CSS Module Completed</span>

                <div className="image-container">
                    <div className="transit-container">
                        <img src={transitImg} alt="" />
                    </div>

                    <div className="logo-container">
                        <img src={jsLogo} alt="JS Icon" />
                    </div>
                </div>
                
                <div className="transition-text">
                    <h1>Ready to write Logics? Welcome to JavaScript!</h1>

                    <p>
                        You’ve built the structure and styled the look. Now it’s time to bring your website to life. JavaScript is where your pages start to think, react, and respond.
                    </p>
                </div>
            </div>

            <PrevNextBtn 
                prevPath="/css_portfolio" 
                nextPath="/js-intro"
            />
        </section>
    );
}
