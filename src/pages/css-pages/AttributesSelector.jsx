import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

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
                This provides precise control over your styling based on HTML attributes like <code>type</code>, <code>href</code>, 
                <code>src</code>, <code>alt</code>, <code>title</code>, <code>data-*</code>, etc.
            </p>

            <h4>Syntax</h4>
<ExampleCode> 
{`element[attribute] {
    property: value;
 }`}
</ExampleCode>

            <h3>Types of Attribute Selectors and Examples</h3>

            <h4>[attribute]</h4>
            <p>Selects elements that have a specific attribute, regardless of value.</p>
<ExampleCode> 
{`input[required] {
    border: 2px solid red;
 }`}
</ExampleCode>
  
            <p><strong>Use Case:</strong> Style all required input fields.</p>

            <h4>[attribute="value"]</h4>
            <p>Selects elements with a specific attribute and exact value.</p>
<ExampleCode> 
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
<ExampleCode> 
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
<ExampleCode> 
{`p[lang|="en"] {
    font-style: italic;
 }`}
</ExampleCode>

            <p><strong>Use Case:</strong> Match English language values like en, en-US, etc.</p>

            <h4>[attribute^="value"]</h4>
            <p>Selects elements whose attribute value starts with a given string.</p>

<ExampleCode> 
{`a[href^="https"] {
    color: green;
 }`}
</ExampleCode>

            <p><strong>Use Case:</strong> Style all secure links (https://).</p>

            <h4>[attribute$="value"]</h4>
            <p>Selects elements whose attribute value ends with a given string.</p>
<ExampleCode> 
{`img[src$=".png"] {
    border-radius: 8px;
 }`}
</ExampleCode>

            <p><strong>Use Case:</strong> Apply styles to .png images.</p>

            <h4>[attribute*="value"]</h4>
            <p>Selects elements whose attribute value contains a given substring.</p>

<ExampleCode> 
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

            <PrevNextBtn 
                prevPath="/css_pseudoelement" 
                nextPath="/css_boxshadow"
            />
        </section>
    );
}
