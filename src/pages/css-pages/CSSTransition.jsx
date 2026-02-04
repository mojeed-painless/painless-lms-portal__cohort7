import '../../assets/styles/course-content.css';
import '../../assets/styles/transition.css';
import cssLogo from '../../assets/css_logo.png';
import transitImg from '../../assets/transit1.png';
import PrevNextBtn from '../../components/common/PrevNextBtn';

export default function CSSTransition() {

    return (
        <section className="course-content transition-content">
            <div className="transition-card">
                <span className="badge">HTML Module Completed</span>

                <div className="image-container">
                    <div className="transit-container">
                        <img src={transitImg} alt="" />
                    </div>

                    <div className="logo-container">
                        <img src={cssLogo} alt="CSS Icon" />
                    </div>
                </div>
                
                <div className="transition-text">
                    <h1>Ready to Style? Welcome to CSS!</h1>

                    <p>
                        You’ve built the web's skeleton with HTML. Now, it’s time to add skin, color, and personality! 
                        We're diving into the world of beautiful design and layout.
                    </p>
                </div>
            </div>

            <PrevNextBtn 
                prevPath="/html-style" 
                nextPath="/css_introduction"
            />
        </section>
    );
}
