import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import '../../assets/styles/welcome-content.css';
import { topics } from '../../data.js';
import welcomImg from '../../assets/welcome-img.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { Check } from 'lucide-react';



export default function WelcomeScreen() {

    const { user } = useAuth();
    const { isLessonComplete } = useProgress();
    
    const [ isSelected, setIsSelected ] = useState('')
    
    function handleSelect(selectedHead) {
        setIsSelected(prev => (
            (prev === selectedHead) ? '' : selectedHead
        ))
        console.log(selectedHead);
    }

    return (
        <section className="welcome__main-content">
            <header>
                <div className="header__image">
                  <img src={welcomImg} alt="Welcome" />
                </div>  
                <div className="header__text">
                    <h3>Hey, {user.firstName || "User"}</h3>
                    {/* <h3>Hey, Mojeed!</h3> */}
                    <h1>Welcome to the world of Web Development</h1>
                    <p className='line-clamp-8'>This course is carefully designed to take complete beginners from ground level to confident web developers. Whether you’ve never written a line of code before or you're curious about how websites are built, this is the perfect starting point. By the end of the course, you’ll have a solid foundation in web technologies and the hands-on skills to create modern, responsive websites—ready to take on real-world projects or dive deeper into advanced development.
                    </p>
                </div>
            </header>

            <section className='welcome'>
                {topics.map(topic => (
                    <div key={topic.id} className="welcome__container">
                        <div className="head" onClick={() => handleSelect(topic.section)}>
                            <div className="head__left">
                                <i><topic.icon /></i>
                                <p><span>{topic.section}:</span> {topic.description}</p>
                            </div>
                            <div className="head__right">
                                <i>{isSelected === topic.section ? <IoIosArrowUp /> : <IoIosArrowDown />}</i>
                            </div>
                        </div>

                        <div className={`body hide ${(isSelected === topic.section) ? 'active' : ''}`} >
                            {topic.subjects.map((subject) => {
                              const isCompleted = isLessonComplete(subject.path);
                              return (
                                <Link key={subject.path} to={subject.path} className={isCompleted ? 'completed-subject' : ''}>
                                    <div>
                                        {isCompleted ? <span className='completion-badge'><Check size={16} /></span> : <i><GiNotebook /></i>}
                                        <p>{subject.name}</p>
                                    </div>
                                </Link>
                              );
                            })}
                        </div>
                    </div>
                ))}

                
            </section>

        </section>
    );
}
