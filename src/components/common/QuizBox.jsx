import { useState } from 'react';
import TakeQuizButton from './TakeQuizButton';
import TopicQuiz from './TopicQuiz';

export default function QuizBox({ currentCategory, currentTopic }) {

    const [isQuizActive, setIsQuizActive] = useState(false);
    
    return (
        <>
            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />
        
            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory={currentCategory} 
                currentTopic={currentTopic} 
              />
            </article>
        </>
                    
    )
}