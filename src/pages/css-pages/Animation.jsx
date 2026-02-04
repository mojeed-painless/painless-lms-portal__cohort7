import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Animation() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Animations</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>CSS animations make it possible to animate transitions from one CSS style configuration to another.</p>

            <h4>Syntax:</h4>
<ExampleCode> 
{`selector {
    animation-name: name;
    animation-duration: time;
    animation-timing-function: ease | linear | ease-in | ease-out | ease-in-out;
    animation-delay: time;
    animation-iteration-count: number | infinite;
    animation-direction: normal | reverse | alternate | alternate-reverse;
    animation-fill-mode: none | forwards | backwards | both;
    animation-play-state: running | paused;
 }`}
</ExampleCode>

            <h3>Key Concepts:</h3>
            <ul>
                <li><strong>@keyframes</strong>: Define what the animation looks like at each stage.</li>
                <li><strong>animation-name</strong>: Name of the @keyframes rule to bind to the element.</li>
                <li><strong>animation-duration</strong>: How long the animation takes to complete one cycle.</li>
                <li><strong>animation-delay</strong>: Wait time before the animation starts.</li>
                <li><strong>animation-iteration-count</strong>: Number of times the animation should play.</li>
                <li><strong>animation-direction</strong>: Whether animation should play in reverse on alternate cycles.</li>
                <li><strong>animation-fill-mode</strong>: Defines how styles are applied before and after animation executes.</li>
                <li><strong>animation-timing-function</strong>: Defines the speed curve.</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Slide In</h3>
<ExampleCode> 
{`<div class="slide">Sliding Box</div>

 <style>

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .slide {
        width: 200px;
        height: 50px;
        background: #ccc;
        margin-bottom: 20px;
        animation: slideIn 2s ease-in-out forwards;
    }

 </style>`}
</ExampleCode>

            <h3>Color Change</h3>
<ExampleCode> 
{`<div class="color">Color Cycle</div>

 <style>

    @keyframes colorChange {
        0% { background-color: red; }
        50% { background-color: yellow; }
        100% { background-color: green; }
    }

    .color {
        width: 200px;
        height: 50px;
        margin-bottom: 20px;
        animation: colorChange 3s infinite alternate;
    }

 </style>`}
</ExampleCode>

            <h3>Bounce</h3>
<ExampleCode> 
{`<div class="bounce">Bouncing</div>

 <style>

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-50px); }
    }

    .bounce {
        width: 200px;
        height: 50px;
        background: orange;
        margin-bottom: 20px;
        animation: bounce 1s ease infinite;
    }

 </style>`}
</ExampleCode>

            <h3>Delay and Forward</h3>
<ExampleCode> 
{`<div class="delay">Delayed Slide</div>

 <style>

    /* uses the slideIn @keyframes already created */

    .delay {
        width: 200px;
        height: 50px;
        background: teal;
        margin-bottom: 20px;
        animation: slideIn 2s ease-in 1s forwards;
    }

 </style>`}
</ExampleCode>

            <h3>Multiple Animations</h3>
<ExampleCode> 
{`<div class="multiple">Bounce + Color</div>

 <style>

    /* bounce & colorChange @keyframes already exist */

    .multiple {
        width: 200px;
        height: 50px;
        background: orange;
        margin-bottom: 20px;
        animation: bounce 1s ease infinite, colorChange 3s infinite alternate;
    }

 </style>`}
</ExampleCode>

    <VideoBox 
        title='Animations'
        code='LNI1Xz5WiXc'
    />
            
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_transition" 
                nextPath="/css_mediaquery"
            />
        </section>
    );
}
