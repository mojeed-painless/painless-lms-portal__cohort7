import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Opacity() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Opacity</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>The <strong>opacity</strong> property in CSS is used to set the transparency level of an element.</p>
            <p>It takes a value from <code className="code">0</code> (completely transparent) to <code className="code">1</code> (fully opaque).</p>

            <h4>Syntax:</h4>
<ExampleCode> 
{`selector {
    opacity: value;
 }`}
</ExampleCode>

            <ul>
                <li><strong>value</strong>: A number between <code className="code">0</code> and <code className="code">1</code></li>
                <li><code className="code">1</code> means fully visible (default)</li>
                <li><code className="code">0</code> means fully invisible</li>
                <li><code className="code">0.5</code> means 50% transparency</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Fully Opaque Element</h3>
<ExampleCode> 
{`div {
    opacity: 1;
 }`}
</ExampleCode>

            <p>This element is completely visible.</p>

            <h3>Semi-Transparent Element</h3>
<ExampleCode> 
{`div {
    opacity: 0.5;
 }`}
</ExampleCode>

            <p>This makes the element 50% transparent.</p>

            <h3>Fully Transparent Element</h3>
<ExampleCode> 
{`div {
    opacity: 0;
 }`}
</ExampleCode>

            <p>The element becomes invisible but still takes up space.</p>

            <h3>Image Transparency</h3>
<ExampleCode> 
{`img {
    opacity: 0.3;
 }`}
</ExampleCode>

            <p>Makes the image faint or "ghost-like".</p>

            <h3>Hover Effect</h3>
<ExampleCode> 
{`button:hover {
    opacity: 0.7;
 }`}
</ExampleCode>

            <p>Reduces the opacity of a button when hovered.</p>

            <h3>Use Cases:</h3>
            <ul>
                <li>To create faded or subtle backgrounds</li>
                <li>To visually disable elements without removing them</li>
                <li>To create hover/focus effects</li>
                <li>To layer content with transparency</li>
            </ul>

            <h3>Notes:</h3>
            <ul>
                <li>The <code className="code">opacity</code> property affects the entire element including its content (text, child elements).</li>
                <li>To make only the background transparent, use <code className="code">rgba()</code> colors instead of opacity.</li>
            </ul>

    <VideoBox 
        title='Opacity'
        code='ZwpthBXrOX4'
    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_boxshadow" 
                nextPath="/css_transform"
            />
        </section>
    );
}
