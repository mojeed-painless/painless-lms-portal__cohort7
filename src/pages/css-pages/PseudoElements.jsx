import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function PseudoElements() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Pseudo Elements</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <h3>What is a Pseudo-element?</h3>
            <p>
                A pseudo-element in CSS is used to style specific parts of an element. For example, you can 
                style only the first letter, first line, or add content before or after an element using 
                pseudo-elements.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`selector::pseudo-element {
   property: value;
}`}
</ExampleCode>

            <h3>Common Pseudo-elements and Examples</h3>

            <h3>::first-line</h3>
            <p>Used to apply styles to only the first line of text within an element.</p>
<ExampleCode language="css"> 
{`p::first-line {
   font-weight: bold;
   text-transform: uppercase;
}`}
</ExampleCode>
            <p><strong>Use Case:</strong> Highlighting the beginning of a paragraph.</p>

            <h3>::first-letter</h3>
            <p>Targets the first letter of an element’s text. Often used for decorative drop caps in articles.</p>
<ExampleCode language="css"> 
{`p::first-letter {
   font-size: 2em;
   color: red;
}`}
</ExampleCode>

            <h3>::before</h3>
            <p>Inserts content before the element’s content. You must use the <code className="code">content</code> property.</p>
<ExampleCode language="css"> 
{`h1::before {
   content: " ";
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Adding icons, labels, or quotes before headings or sections.</p>

            <h3>::after</h3>
            <p>Inserts content after the element’s content. Also requires the <code className="code">content</code> property.</p>
<ExampleCode language="css"> 
{`h1::after {
   content: " ";
}`}
</ExampleCode>

            <h3>::marker</h3>
            <p>Targets the bullet or number of a list item. Works on elements with <code className="code">display: list-item</code>.</p>
<ExampleCode language="css"> 
{`li::marker {
   color: green;
   font-size: 1.5em;
}`}
</ExampleCode>

            <h3>::selection</h3>
            <p>Applies styles to the part of the document that the user has selected (highlighted).</p>
<ExampleCode language="css"> 
{`p::selection {
   background-color: yellow;
   color: black;
}`}
</ExampleCode>

    <VideoBox 
        title='Pseudo Elements'
        code='DaGBX75BbUE'
    />
            
                </div>
            </section>

            <QuizBox currentCategory="css2" currentTopic="Pseudo Elements" />
            <PrevNextBtn 
                prevPath="/css_pseudoclass" 
                nextPath="/css_attribute"
            />
        </section>
    );
}
