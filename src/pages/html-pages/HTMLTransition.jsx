import { useState } from 'react';
import '../../assets/styles/course-content.css';
import '../../assets/styles/transition.css';
import htmlLogo from '../../assets/html_logo.png';
import transitImg from '../../assets/transit1.png';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function HTMLTransition() {

    const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content transition-content">
            {/* <div className="course-content__header">
                <h1>HTML Transition</h1>
            </div>

            <section>
                <div className="course-content__container">
                </div>
            </section> */}

            <div className="transition-card">
                <span className="badge">Introduction Completed</span>

                <div className="image-container">
                    <div className="transit-container">
                        <img src={transitImg} alt="" />
                    </div>

                    <div className="logo-container">
                        <img src={htmlLogo} alt="HTML Icon" />
                    </div>
                </div>
                
                <div className="transition-text">
                    <h1>Welcome to HTML</h1>

                    <p>
                        You've grasped the concepts. Now, let's build the structure. 
                        Get ready to learn the language that builds the skeleton of the entire internet.
                    </p>
                </div>
            </div>

                        <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

                        <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
                            <TopicQuiz 
                                onSelect={() => setIsQuizActive(prev => !prev)} 
                                currentCategory="html" 
                                currentTopic="Welcome to HTML" 
                            />
                        </article>

                        <PrevNextBtn 
                                prevPath="/editor" 
                                nextPath="/html-structure"
                        />
        </section>
    );
}
