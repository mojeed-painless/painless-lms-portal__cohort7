import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function BoxModel() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Box Model</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            In web design, every HTML element is treated as a rectangular box, and the <strong> CSS Box Model </strong> defines how the space around that box is handled.
                        </p>

                        <p>
                            This model is the foundation of all layout and spacing on a web page. Understanding it is crucial to mastering positioning, spacing, and element arrangement.
                        </p>

                        <p>
                            <span style={{color: 'greenyellow'}}> <strong>The box model is made up of four areas, from inside out</strong> </span>
                            <ol>
                                <li>Content</li>
                                <li>Padding</li>
                                <li>Border</li>
                                <li>Margin</li>
                            </ol>
                        </p>

                        

 
    <p> <strong> From innermost to outermost:</strong></p>
<ExampleCode> 
{`Content → Padding → Border → Margin`}
</ExampleCode>

                        <p>
                            <span style={{color: 'greenyellow'}}> <strong>Think of it like a gift box:</strong> </span>
                            <ul>
                                <li>The <b>content</b> is the actual gift.</li>
                                <li>The <b>padding</b> is the space between inner wall of the box and the gift.</li>
                                <li>The <b>border</b>  is the wall of the box itself.</li>
                                <li>The <b>margin</b>  is the space between your box and other nearby boxes.</li>
                            </ul>
                        </p>

  <h3>Content</h3>
  <p>This is the actual text, image, or element inside your HTML tag. You define its size using <code>width</code> and <code>height</code>.</p>

  <h3>Padding</h3>
  <p>This is the space between the content and the border. It "pushes" the border away from the content.</p>

<ExampleCode> 
{`p  {
    padding: 10px 20px;
 }`}
</ExampleCode>

                        <p>
                            <strong>You can also control padding per side:</strong>
                            <ul>
                                <li><code>padding-top</code></li>
                                <li><code>padding-right</code></li>
                                <li><code>padding-bottom</code></li>
                                <li><code>padding-left</code></li>
                            </ul>
                        </p>

                        <p><strong>Or shorthand like this:</strong></p>
<ExampleCode> 
{`padding: 10px 20px 15px 5px; /* top right bottom left */`}
</ExampleCode>



  <h3>Border</h3>
  <p>This wraps around both the content and the padding. Borders can be styled, colored, and have their width adjusted.</p>

<ExampleCode> 
{`div {
    border: 2px solid #333;
 }`}
</ExampleCode>


  <h3>Margin</h3>
  <p>Margin is the space outside the border, separating the element from its neighbors. It’s what gives elements breathing room on the page.</p>

<ExampleCode> 
{`div {
    margin: 20px;
 }`}
</ExampleCode>

 <p><strong>Margin can also be set individually:</strong></p>
<ExampleCode> 
{`div {
    margin-top: 10px;
    margin-bottom: 20px;
 }`}
</ExampleCode>

 <p><strong>Or shorthand:</strong></p>
<ExampleCode> 
{`div {
    margin: 10px 20px 15px 5px; 
 }`}
</ExampleCode>

<h4>Difference Between Margin and Padding</h4>
                        <table border="1" cellpadding="8" cellspacing="0">
                            <tr>
                                <th>Padding</th>
                                <th>Margin</th>
                            </tr>

                            <tr>
                                <td>Inside the border</td>
                                <td>Outside the border</td>
                            </tr>

                            <tr>
                                <td>inherits background color</td>
                                <td>transparent by default</td>
                            </tr>

                            <tr>
                                <td>Pushes content inward</td>
                                <td>Pushes other elements outward</td>
                            </tr>
                        </table>

                        

  <h3>Outline</h3>
  <p>
    An outline is a line drawn outside the element’s border. Unlike borders, outlines do not take up space — they don’t affect layout.
  </p>

                        <p>
                            <strong>Common outline properties:</strong>
                            <ul>
                                <li><code>outline-style</code></li>
                                <li><code>outline-color</code></li>
                                <li><code>outline-width</code></li>
                                <li><code>outline-offset</code></li>
                            </ul>
                        </p>

<h4>Example:</h4>
<ExampleCode> 
{`div {
    outline: 2px dashed red;
    outline-offset: 10px;
 }`}
</ExampleCode>

<p><code>outline-offset</code> adds space between the border and the outline.</p>


<h3>Conclusion</h3>
<p>The CSS Box Model is the foundation of layout in web development. Every visible HTML element adheres to this model. Understanding how each layer — content, padding, border, and margin — works independently and together will help you:</p>
<ul>
    <li>Fix spacing issues</li>
    <li>Design responsive layouts</li>
    <li>Avoid layout overflow problems</li>
    <li>Build consistent and neat web designs</li>
</ul>

<h3 className="bold">Mastering the box model early saves you countless hours down the line.</h3>

    <VideoBox 
        title='Understanding the Box Model'
        code='d4dHELUd_Jc?si=KhdfbHJEoRw8vQC1'
    />
                        
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_border" 
                nextPath="/css_width"
            />
        </section>
    );
}
