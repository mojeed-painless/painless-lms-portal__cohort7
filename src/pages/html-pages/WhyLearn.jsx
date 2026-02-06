import { useState } from 'react';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function WhyLearn() {

  const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Why should I Learn Coding?</h1>
                <p>Introduction</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                        You might be asking, <strong>“Why do I need to learn coding just to build a website? Aren’t there platforms where I can drag and drop components  or even prompt AI and have a website ready in minutes?”</strong>
                      </p>

                      <p>
                        Absolutely—those platforms exist, and they’re incredibly useful. But this course isn’t just about building simple websites.
                      </p>

                      <h3 className="bold">This is about unlocking a skill that goes far beyond visual editors and AI prompts.</h3>

                      <p>
                        It’s about understanding how technology works from the inside out. It’s a stepping stone into the vast world of tech—software development, automation, artificial intelligence, app creation, and digital problem-solving.
                      </p>

                      <p>
                        Learning to code is like learning how to think differently. It equips you with problem-solving tools that will be relevant whether you're building a blog, launching a startup, analyzing data, or even writing legal tech tools.
                      </p>

                      <h5>Steve Jobs (Co-founder & CEO, Apple Inc.)</h5>
                      <blockquote>
                        “I think everybody should learn how to program a computer and learn computer language. Because it teaches you how to think in a certain way.”
                      </blockquote>

                      <p></p>


                      <h5>Bill Gates (Founder, Microsoft)</h5>
                      <blockquote>
                        “Programming is where you are describing to the machine how to do something—telling it how to play tic-tac-toe, how to play the board game Monopoly, how to convert numbers from one base to another. The fact of understanding how the computer works gives you a real sense of what it can do and what it can't do.”
                      </blockquote>

                      <p>
                        If you’ve ever used a smartphone, computer, or even a smartwatch, then you’ve already touched the surface of what tech can do.
                        But if you really want to understand <strong>what’s under the hood</strong>, and how these tools are made—<strong>coding is your gateway.</strong>
                      </p>

                      <h5>Mark Zuckerberg (Co-founder & CEO, Facebook)</h5>
                      <blockquote>
                        “Programming is one of the only things in the world that you can do where you can sit down and just make something completely new from scratch.”
                      </blockquote>

                      <p>
                        And guess what? In this course, you’ll learn how to build from scratch—even while lying on your back (literally).<br></br>
                        But hey, if you’ve signed a lifelong deal with Mr. Sleep, maybe it's time to renegotiate—just for a while.
                      </p>

                      <h5>Ali Partovi (Entrepreneur & Investor)</h5>
                      <blockquote>
                        “For a few, learning a computer program might lead to a lucrative career as so-called coders. But for everybody, it will teach them how to think.”
                      </blockquote>

                      <p>
                        People are waking up. The future is arriving faster than you think. 
                        And trust me—you don’t want to be left behind when it fully lands.
                      </p>

                      <h3 className="bold">
                        So don’t wait. Take this opportunity seriously. Equip yourself with coding skills while you still can. Because this isn’t just about building websites—<br></br>
                        <em>it’s about building your future.</em>
                      </h3>   
                </div>
            </section>

            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory="html" 
                currentTopic="Why should I learn Coding" 
              />
            </article>

            <PrevNextBtn 
                prevPath="/general-overview" 
                nextPath="/course-overview"
            />
        </section>
    );
}
