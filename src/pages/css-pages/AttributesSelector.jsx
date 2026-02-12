import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function AttributesSelector() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Attributes Selectors</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>
                Attribute selectors allow you to target HTML elements based on the presence or value of their attributes. 
                This provides precise control over your styling based on HTML attributes like <code className="code">type</code>, <code className="code">href</code>, 
                <code className="code">src</code>, <code className="code">alt</code>, <code className="code">title</code>, <code className="code">data-*</code>, etc.
            </p>

            <h4>Syntax</h4>
<ExampleCode language="css"> 
{`element[attribute] {
   property: value;
}`}
</ExampleCode>

            <h3>Types of Attribute Selectors and Examples</h3>

            <h4>[attribute]</h4>
            <p>Selects elements that have a specific attribute, regardless of value.</p>
<ExampleCode language="css"> 
{`input[required] {
   border: 2px solid red;
}`}
</ExampleCode>
  
            <p><strong>Use Case:</strong> Style all required input fields.</p>

            <h4>[attribute="value"]</h4>
            <p>Selects elements with a specific attribute and exact value.</p>
<ExampleCode language="css"> 
{`input[type="email"] {
   background-color: lightblue;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Target email input fields specifically.</p>

            <h3 className="bold">Some attributes are rarely seen in modern codes but it's 
                important we mention them incase you come across them in code bases. Examples
                of such attributes include: 
            </h3>

            <h4>[attribute~="value"]</h4>
            <p>
                Selects elements with an attribute containing a space-separated list of words, 
                one of which matches the given value.
            </p>
<ExampleCode language="css"> 
{`div[class~="card"] {
   border: 1px solid black;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Select elements where the class attribute includes "card" among other classes.</p>

            <h4>[attribute|="value"]</h4>
            <p>
                Matches elements whose attribute value is exactly the value, or starts with the value 
                followed by a hyphen -.
            </p>
<ExampleCode language="css"> 
{`p[lang|="en"] {
   font-style: italic;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Match English language values like en, en-US, etc.</p>

            <h4>[attribute^="value"]</h4>
            <p>Selects elements whose attribute value starts with a given string.</p>

<ExampleCode language="css"> 
{`a[href^="https"] {
   color: green;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Style all secure links (https://).</p>

            <h4>[attribute$="value"]</h4>
            <p>Selects elements whose attribute value ends with a given string.</p>
<ExampleCode language="css"> 
{`img[src$=".png"] {
   border-radius: 8px;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Apply styles to .png images.</p>

            <h4>[attribute*="value"]</h4>
            <p>Selects elements whose attribute value contains a given substring.</p>

<ExampleCode language="css"> 
{`a[href*="example"] {
   color: orange;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Match any link that includes "example" in the URL.</p>


    <VideoBox 
        title='Attributes'
        code='95sF-AdWvVQ'
    />
       
                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Attributes Selectors" />
            <PrevNextBtn 
                prevPath="/css_pseudoelement" 
                nextPath="/css_boxshadow"
            />
        </section>
    );
}
