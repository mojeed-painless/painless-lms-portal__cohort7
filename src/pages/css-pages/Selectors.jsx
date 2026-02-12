import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function Selectors() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Selectors</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            CSS Selectors are used to “select” or target the HTML elements you want to style.
                            Without selectors, the browser won’t know what parts of the webpage to apply styles to.
                        </p>

                        <h3>Types of CSS Selectors</h3>

                        <h4>Element Selector</h4>
                        <p>
                            This targets HTML elements directly by their tag name.
                            For example, to style all paragraph tags:
                        </p>

<ExampleCode language="css"> 
{`p {
    color: green;
}`}
</ExampleCode>

                        <h4>ID Selector</h4>
                        <p>
                            This targets a specific HTML element by its unique <code className="code">id</code> attribute.
                            Use a hash <code className="code">#</code> followed by the ID name.
                        </p>
<ExampleCode language="html"> 
{`<div id="left"></div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`#left {
    background-color: lightblue;
}`}
</ExampleCode>

                        <p style={{color: 'greenyellow'}}><strong><em>Note: IDs must be unique on a page.</em></strong></p>

                        <h4>Class Selector</h4>
                        <p>
                            This targets one or more elements with a shared <code className="code">class</code> attribute.
                            Use a dot <code className="code">.</code> followed by the class name.
                        </p>
<ExampleCode language="html"> 
{`<p class="right">Content</p>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.right {
    text-align: right;
}`}
</ExampleCode>

                        <h4>Universal Selector</h4>
                        <p>
                            The universal selector <code className="code">*</code> selects <strong>all</strong> elements on the page.
                            It's useful for resetting styles:
                        </p>
<ExampleCode language="css"> 
{`* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`}
</ExampleCode>

                        <h4>Group Selector</h4>
                        <p>
                            This allows you to group multiple selectors that share the same styles. Use a comma to separate them.
                        </p>
<ExampleCode language="css"> 
{`p, div, h1 {
    font-family: Arial, sans-serif;
}`}
</ExampleCode>
                        <h3>Conclusion</h3>
                         <p>
                            Understanding CSS selectors is the foundation of effective web styling. Selectors allow you to target and style specific elements on your web page with precision. Whether you're applying styles to a single unique ID, multiple elements sharing the same class, or the entire page using the universal selector, mastering these tools will make your designs cleaner, more scalable, and easier to maintain.
                         </p>
                         <p>
                            As you progress, you'll find that combining selectors and using them creatively gives you greater control over your layout and design. 
                         </p>
                         <h3 className="bold">
                            So take your time, experiment with different types, and get comfortable — selectors are your first real step into the power of CSS!
                         </h3>

    <VideoBox 
        title='Selectors'
        code='fNH8EqUeKf4?si=T19fUkCteWHBXzh0'
    />


                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Selectors" />
            <PrevNextBtn 
                prevPath="/css_syntax" 
                nextPath="/css_color"
            />
        </section>
    );
}
