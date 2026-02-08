import { useState } from 'react';
import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function CSSSyntax() {

    const [isQuizActive, setIsQuizActive] = useState(false);
    
    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>CSS Syntax</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            Every CSS rule consists of two main parts: the <strong>selector</strong> and the <strong>declaration block</strong>.
                        </p>

                        <h3>Basic Syntax Structure</h3>

<ExampleCode> 
{`selector {
    property: value;
 }`}
</ExampleCode>

                        <p>
                            The <code className="code">selector</code> points to the HTML element you want to style. For example, <code className="code">div</code>, <code className="code">p</code>, or <code className="code">h1</code>.
                        </p>

                        <p>
                            The <code className="code">property</code> is the style attribute you want to change, such as <code className="code">color</code>, <code className="code">font-size</code>, or <code className="code">background</code>.
                        </p>

                        <p>
                            The <code className="code">value</code> is what you want to assign to that property, such as <code className="code">red</code>, <code className="code">16px</code>, or <code className="code">#333</code>.
                        </p>

                        <p>
                            A colon <code className="code">:</code> is used to separate the property from its value. A semicolon <code className="code">;</code> is used to separate multiple declarations inside the block.
                        </p>

                        <h4>Example</h4>

<ExampleCode> 
{`div {
    color: red;
    font-size: 18px;
    background-color: #f0f0f0;
 }`}
</ExampleCode>

                        <p>
                            In the example above:
                            <ul>
                            <li><strong>div</strong> is the selector</li>
                            <li><strong>color</strong>, <strong>font-size</strong>, and <strong>background-color</strong> are properties</li>
                            <li><strong>red</strong>, <strong>18px</strong>, and <strong>#f0f0f0</strong> are the values</li>
                            </ul>
                        </p>

                        <p>
                            The entire block of styles (inside the curly braces <code className="code">{ }</code>) is known as the <strong>declaration block</strong>.
                        </p>

                        <h3>Styling Multiple Properties</h3>

                        <p>
                            You can add multiple style properties inside a single declaration block. Just make sure to end each line with a semicolon <code className="code">;</code>:
                        </p>

<ExampleCode> 
{`p {
    color: blue;
    line-height: 1.5;
    text-align: justify;
 }`}
</ExampleCode>

    <VideoBox 
        title='Syntax'
        code='2Y9FJ68wWhuk?si=N7lp4UgQlShWtYKC'
    />
                    
                </div>
            </section>





                        <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />
            
                        <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
                          <TopicQuiz 
                            onSelect={() => setIsQuizActive(prev => !prev)} 
                            currentCategory="css" 
                            currentTopic="CSS Syntax" 
                          />
                        </article>

            <PrevNextBtn 
                prevPath="/css_insert" 
                nextPath="/css_selectors"
            />
        </section>
    );
}
