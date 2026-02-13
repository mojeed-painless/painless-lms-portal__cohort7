import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function PseudoClasses() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Pseudo Classes</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <h3>What Are Pseudo-classes in CSS?</h3>
            <p>
                A pseudo-class in CSS is used to define the special state of an element. 
                For example, styling when a user hovers over a link, or selecting the first 
                child of an element.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`selector:pseudo-class {
   property: value;
}`}
</ExampleCode>

            <p>There is no space between the selector and the pseudo-class.</p>

            <h3>Commonly Used Pseudo-classes</h3>

            <h4>Anchor Pseudo-classes</h4>
            <p>These are used to define styles for different states of links 
                (<code className="code">&lt;a&gt;</code> tags):
            </p>
            <ul>
                <li><code className="code">:link</code> – a link that has not been visited.</li>
                <li><code className="code">:visited</code> – a link that has been visited.</li>
                <li><code className="code">:hover</code> – when the mouse is over the link.</li>
                <li><code className="code">:active</code> – the moment a link is clicked.</li>
            </ul>
<ExampleCode language="css"> 
{`a:link {
   color: blue;
}

a:visited {
   color: purple;
}

a:hover {
   background-color: yellow;
}

a:active {
   color: red;
}`}
</ExampleCode>

            <h4>Interaction States</h4>
            <p>like <code className="code">:hover</code>, <code className="code">:focus</code>, <code className="code">:active</code> 
                apply to various elements beyond links:
            </p>
<ExampleCode language="css"> 
{`button:hover {
   background-color: lightgreen;
}

input:focus {
   border: 2px solid blue;
}`}
</ExampleCode>

            <h4>Structural Pseudo-classes</h4>
            <p>These target elements based on their position in the DOM:</p>
            <ul>
                <li><code className="code">:first-child</code> – Selects the first child.</li>
                <li><code className="code">:last-child</code> – Selects the last child.</li>
                <li><code className="code">:nth-child(n)</code> – Selects the nth child.</li>
                <li><code className="code">:nth-of-type(n)</code> – Selects the nth occurrence of an element of that type.</li>
            </ul>
<ExampleCode language="css"> 
{`p:first-child {
   color: green;
}

li:last-child {
   font-weight: bold;
}

li:nth-child(2) {
   color: red;
}`}
</ExampleCode>

            <h4>State-based Pseudo-classes</h4>
            <p>Useful for form elements:</p>
            <ul>
                <li><code className="code">:checked</code> – radio or checkbox inputs that are checked.</li>
                <li><code className="code">:disabled</code> – disabled form elements.</li>
                <li><code className="code">:enabled</code> – enabled elements.</li>
                <li><code className="code">:required</code> – required inputs.</li>
                <li><code className="code">:optional</code> – optional inputs.</li>
            </ul>
<ExampleCode language="css"> 
{`input:checked {
   outline: 2px solid red;
}

input:disabled {
   background-color: #eee;
}`}
</ExampleCode>

            <h4>Negation Pseudo-class</h4>
            <p><code className="code">:not(selector)</code> – selects every element except the one specified.</p>
<ExampleCode language="css"> 
{`p:not(.highlight) {
   color: gray;
}`}
</ExampleCode>

            <h4>Target Pseudo-class</h4>
            <p><code className="code">:target</code> – selects an element that's being targeted by a URL fragment (like <code className="code">#section1</code>).</p>
<ExampleCode language="css"> 
{`#section1:target {
   background: lightyellow;
}`}
</ExampleCode>

            <h3>Summary:</h3>
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                <tr>
                    <th>Pseudo-class</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>:hover</td>
                    <td>When the mouse is over an element</td>
                </tr>
                <tr>
                    <td>:focus</td>
                    <td>When an input is focused</td>
                </tr>
                <tr>
                    <td>:first-child</td>
                    <td>Targets the first child of an element</td>
                </tr>
                <tr>
                    <td>:nth-child(n)</td>
                    <td>Targets the nth child</td>
                </tr>
                <tr>
                    <td>:checked</td>
                    <td>For checked form inputs</td>
                </tr>
                <tr>
                    <td>:disabled</td>
                    <td>For disabled form inputs</td>
                </tr>
                <tr>
                    <td>:not(selector)</td>
                    <td>Excludes elements that match the selector</td>
                </tr>
                <tr>
                    <td>:target</td>
                    <td>Matches URL-fragment-targeted elements</td>
                </tr>
                </tbody>
            </table>

    <VideoBox 
        title='Pseudo Classes'
        code='0U3f_K2JYus'
    />


                </div>
            </section>

            <QuizBox currentCategory="css2" currentTopic="Pseudo Classes" />
            <PrevNextBtn 
                prevPath="/css_conbinator" 
                nextPath="/css_pseudoelement"
            />
        </section>
    );
}
