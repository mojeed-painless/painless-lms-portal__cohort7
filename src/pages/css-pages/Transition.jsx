import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function Transition() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Transition</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p><strong>CSS Transitions</strong> allow you to change property values smoothly (over a given duration), instead of instantly.</p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`selector {
   transition: property duration timing-function delay;
}`}
</ExampleCode>

            <ul>
                <li><strong>property</strong>: the CSS property you want to animate (e.g., <code className="code">width</code>, <code className="code">color</code>, <code className="code">opacity</code>)</li>
                <li><strong>duration</strong>: how long the transition takes (e.g., <code className="code">1s</code>, <code className="code">500ms</code>)</li>
                <li><strong>timing-function</strong> (optional): defines the speed curve (e.g., <code className="code">ease</code>, <code className="code">linear</code>, <code className="code">ease-in</code>, <code className="code">ease-out</code>, <code className="code">ease-in-out</code>)</li>
                <li><strong>delay</strong> (optional): time to wait before the transition starts</li>
            </ul>

            <h4>Shorthand Example:</h4>
<ExampleCode language="css"> 
{`div {
   transition: all 0.5s ease-in-out;
}`}
</ExampleCode>

            <h3>Longhand Properties:</h3>
            <ul>
                <li><code className="code">transition-property</code></li>
                <li><code className="code">transition-duration</code></li>
                <li><code className="code">transition-timing-function</code></li>
                <li><code className="code">transition-delay</code></li>
            </ul>

            <h3>Longhand Example:</h3>
<ExampleCode language="css"> 
{`div {
   transition-property: background-color, width;
   transition-duration: 0.3s;
   transition-timing-function: ease;
   transition-delay: 0s;
}`}
</ExampleCode>

            <h3>Common Properties You Can Animate:</h3>
            <ul>
                <li><code className="code">background-color</code></li>
                <li><code className="code">color</code></li>
                <li><code className="code">width</code>, <code className="code">height</code></li>
                <li><code className="code">margin</code>, <code className="code">padding</code></li>
                <li><code className="code">opacity</code></li>
                <li><code className="code">transform</code></li>
                <li><code className="code">box-shadow</code></li>
                <li><code className="code">border</code> properties</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Width Transition on Hover</h3>
<ExampleCode language="css"> 
{`div {
   width: 100px;
   transition: width 0.5s;
}

div:hover {
   width: 200px;
}`}
</ExampleCode>

            <h3>Background Color Transition</h3>
<ExampleCode language="css"> 
{`button {
   background-color: red;
   transition: background-color 0.3s ease-in;
}

button:hover {
   background-color: green;
}`}
</ExampleCode>

            <h3>Multiple Property Transition</h3>
<ExampleCode language="css"> 
{`div {
   width: 100px;
   background-color: blue;
   transition: width 0.5s, background-color 1s;
}

div:hover {
   width: 200px;
   background-color: orange;
}`}
</ExampleCode>

            <h3>Using Transition Delay</h3>
<ExampleCode language="css"> 
{`div {
   background-color: grey;
   transition: background-color 1s ease 0.5s;
}

div:hover {
   background-color: black;
}`}
</ExampleCode>

            <h3>Notes:</h3>
            <ul>
                <li>Transitions only occur when a property value changes.</li>
                <li>Only animatable properties can be transitioned.</li>
                <li>Transitions need a trigger (like <code className="code">:hover</code>, <code className="code">:focus</code>, class toggle, or JavaScript).</li>
            </ul>

    <VideoBox 
        title='Transition'
        code='gKLQndrqD8g?si=a5Vfa98FBnkewxIk'
    />
         
                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Transition" />
            <PrevNextBtn 
                prevPath="/css_transform" 
                nextPath="/css_animation"
            />
        </section>
    );
}
