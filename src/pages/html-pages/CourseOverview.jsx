
import { useState } from 'react';
import '../../assets/styles/course-content.css';
import htmlCar from '../../assets/html_car.jpg'
import htmlCode1 from '../../assets/html1_code.png'
import htmlOutput1 from '../../assets/html1_output.png'
import cssCar from '../../assets/css_car.jpg'
import cssCode1 from '../../assets/css1_code.png'
import cssOutput1 from '../../assets/css1_output.png'
import jsCar from '../../assets/js_car.jpg'
import PrevNextBtn from '../../components/common/PrevNextBtn';
import CodeBox from '../../components/common/CodeBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function CourseOverview() {

    const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Course Overview</h1>
                <p>Introduction</p>
            </div>

            <section>
                <div className="course-content__container">
                        <h3 className="bold">
                            Learning HTML, CSS, and JavaScript will equip you with all the essential 
                            skills you need to build dynamic, responsive, and interactive websites.
                        </h3>

                        <hr />

                        <h3>HTML – The Structure</h3>

                        <img src={htmlCar} alt="HTML Car" />

                        <p>
                            Hyper Text Markup Language (HTML) is the foundation of every web page. 
                            Think of it like the skeleton of a car, as shown in the first image above.
                            Without the skeleton, there's no place to attach the tires, brake lights, or engine.
                        </p>
                        <p>
                            Similarly, HTML creates the framework of a web page—it defines what shows up and where.
                            But just like no one wants to drive around in a bare metal frame, a plain HTML page isn’t 
                            very attractive. That’s where CSS comes in.
                        </p>

                        <h4>Example: Output of HTML without CSS</h4>
                        <p>Click <i><b>"Run code"</b></i> to display output</p>

                        <CodeBox 
                            id='htmlCode1'
                            lang='HTML'
                            outputImg={htmlOutput1}
                        >
                            <img src={htmlCode1} alt="" />
                        </CodeBox>

                        <hr />

                        <h3>CSS – The Styling</h3>

                        <img src={cssCar} alt="CSS Car" />

                        <p>
                            Cascading Style Sheet (CSS) gives life and beauty to the structure created by HTML. 
                            It’s like painting the car, installing leather seats, and adding those sleek headlights.
                        </p>
                        {/* <p>
                            The second image shows what styling can do. Both pictures have the same HTML, 
                            but their appearances are entirely different—all thanks to CSS.
                        </p> */}
                        <p>
                            So if HTML is the skeleton, CSS is the beauty and polish that make everything visually appealing.
                        </p>

                        <h4>Example:</h4>
                        <p>Click <i><b>"Run code"</b></i> to display output</p>
                        
                        <CodeBox 
                            id='htmlCode1'
                            lang='HTML'
                            outputImg={cssOutput1}
                        >
                            <img src={cssCode1} alt="" />
                        </CodeBox>

                        <hr />

                        <h3>JavaScript – The Interactivity</h3>

                        <img src={jsCar} alt="JavaScript Car" />

                        <p>
                            Now that your car looks beautiful, how should it function? Want to open the door with a button 
                            or remote? Make it automatic or manual? That’s the role of JavaScript.
                        </p>
                        <p>
                            JavaScript makes websites interactive and responsive to user actions—clicking buttons, 
                            submitting forms, triggering animations, and more.
                        </p>
                        <h3 className="bold">
                            In short, every modern website you visit is built using <strong>HTML</strong> for structure, 
                            <strong>CSS</strong> for design, and <strong>JavaScript</strong> for interactivity—all working 
                            together in harmony inside your browser.
                        </h3>
                </div>
            </section>

                        <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

                        <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
                            <TopicQuiz 
                                onSelect={() => setIsQuizActive(prev => !prev)} 
                                currentCategory="html" 
                                currentTopic="Course Overview" 
                            />
                        </article>

                        <PrevNextBtn 
                                prevPath="/why" 
                                nextPath="/editor"
                        />
        </section>
    );
}
