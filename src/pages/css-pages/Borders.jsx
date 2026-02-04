import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Borders() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Borders</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            CSS borders allow you to control the appearance of element boundaries. You can define the style, width, color, radius (rounded corners), and more.
                        </p>

                        <h3>border-style</h3>
                        <p>
                            This property defines the type of line the border will be. You can use up to 4 values in clockwise order:
                            <code>dotted</code>, <code>dashed</code>, <code>solid</code>, <code>double</code>, <code>groove</code>, <code>ridge</code>, <code>inset</code>, <code>outset</code>, <code>none</code>, <code>hidden</code>.
                        </p>

<ExampleCode> 
{`p {
    border-style: dotted dashed solid double;
 }`}
</ExampleCode>

                        <p><strong> And these values are in the following sequences, top right bottom left</strong></p>

  <h3>border-width</h3>
  <p>
    Defines the thickness of the border using units like <code>px</code>, <code>pt</code>, <code>cm</code>, <code>em</code>, or keywords like <code>thin</code>, <code>medium</code>, and <code>thick</code>.
  </p>
<ExampleCode> 
{`p {
    border-width: 20px 5px 15px 10px;
 }`}
</ExampleCode>

  <h3>border-color</h3>
  <p>
    Sets the color of the border. You can use color names, HEX, RGB, or other supported color values. You can also assign different colors for each side.
  </p>
<ExampleCode> 
{`p {
    border-color: red green blue yellow;
 }`}
</ExampleCode>

  <h3>Individual Sides</h3>
  <p>You can specify border styles, colors, and widths individually:</p>
  <ul>
    <li><code>border-top-style</code></li>
    <li><code>border-right-color</code></li>
    <li><code>border-bottom-width</code></li>
    <li><code>border-left</code>, etc.</li>
  </ul>

  <h3> border (shorthand)</h3>
  <p>
    Instead of writing multiple properties, you can use a shorthand to combine width, style, and color.
  </p>
<ExampleCode> 
{`p {
    border: 5px solid red;
 }

 p {
    border: width style color;
 }`}
</ExampleCode>

  <h3> border-radius</h3>
  <p>
    Adds rounded corners to elements. You can apply different radii to each corner in clockwise order.
  </p>
<ExampleCode> 
{`p {
    border-radius: 5px 10px 15px 2px;
 }`}
</ExampleCode>


    <VideoBox 
        title='Borders'
        code='9WQWUC5w74A?si=0uMAgay579gsp4pb'
    />
                       
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_background" 
                nextPath="/css_boxmodel"
            />
        </section>
    );
}
