import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Links() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Links</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>In HTML, links are created using the <code className="code">&lt;a&gt;</code> tag. CSS gives 
                            you the ability to style these links to improve appearance and user 
                            interaction. You can change the color, add background, modify fonts, 
                            and more.
                        </p>

<ExampleCode> 
{`<a href="https://www.example.com">Visit Example</a>`}
</ExampleCode>

                        <p>By default, browsers style links with an underline and a color (usually blue 
                            for unvisited and purple for visited). But with CSS, you can completely 
                            customize this behavior.
                        </p>

                        <h3>Link States in CSS</h3>

                        <p>There are 4 key states of a link that you can target in CSS:</p>

                        <ul>
                            <li><code className="code">:link</code> – Targets links that have not been visited.</li>
                            <li><code className="code">:visited</code> – Targets links the user has previously clicked.</li>
                            <li><code className="code">:hover</code> – Targets links when the mouse is placed over them.</li>
                            <li><code className="code">:active</code> – Targets the link while it is being clicked.</li>
                        </ul>

                        <p>The order in which you define these states matters. The correct order is:<br />
                        <code className="code">a:link → a:visited → a:hover → a:active</code>
                        </p>

                        <h3>Examples</h3>

                        <p>Here’s how you might define styles for the different link states:</p>

<ExampleCode> 
{`a:link {
    color: blue;
    text-decoration: none;
 }

 a:visited {
    color: purple;
 }

 a:hover {
    color: green;
    text-decoration: underline;
 }

 a:active {
    color: red;
 }`}
</ExampleCode>

                        <p>This means:</p>
                        <ul>
                            <li>Before clicking, the link is blue.</li>
                            <li>After visiting, it turns purple.</li>
                            <li>On hover, it turns green and gets underlined.</li>
                            <li>While clicking, it flashes red.</li>
                        </ul>

    <VideoBox 
        title='Links 1'
        code='-JOv3KVL0iA?si=o1O4hXd_8yf4eI30'
    />

    <VideoBox 
        title='Links 2'
        code='NShxS3FVTEc?si=2k840xP5uUyoPJDN'
    />
    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_formatting" 
                nextPath="/css_lists"
            />
        </section>
    );
}
