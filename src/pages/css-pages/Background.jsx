import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Background() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Background</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            CSS provides several properties that allow you to control the background of an element. These properties can enhance the design and user experience of your web pages.
                        </p>

                        <h3>Background Properties</h3>

                        <ul>
                            <li><strong>background-color</strong> – Sets the background color of an element.</li>
                            <li><strong>background-image</strong> – Adds an image as the background.</li>
                            <li><strong>background-repeat</strong> – Determines if and how the background image should repeat.</li>
                            <li><strong>background-position</strong> – Specifies the position of the background image.</li>
                            <li><strong>background-attachment</strong> – Sets whether a background image scrolls with the page or stays fixed.</li>
                            <li><strong>background-size</strong> – Controls the size of the background image.</li>
                        </ul>

                        <h4> Examples</h4>

  <h3> background-color</h3>
<ExampleCode> 
{`div {
    background-color: lightblue;
 }`}
</ExampleCode>

  <h3>background-image</h3>
<ExampleCode> 
{`body {
    background-image: url("background.jpg");
 }`}
</ExampleCode>

  <h3> background-repeat</h3>
  <p>By default, background images repeat both horizontally and vertically.</p>
<ExampleCode> 
{`body {
   background-repeat: no-repeat;
 }

 OR

 body {
    background-repeat: repeat-x;
 }

 OR

 body {
    background-repeat: repeat-y;
 }`}
</ExampleCode>

  <h3> background-position</h3>
<ExampleCode> 
{`body {
    background-position: center top;
 }`}
</ExampleCode>

  <h3>background-attachment</h3>
<ExampleCode> 
{`body {
    background-attachment: fixed;
 }`}
</ExampleCode>

  <h3> background-size</h3>
<ExampleCode> 
{`body {
    background-size: cover;
 }`}
</ExampleCode>

  <h3>Shorthand Property</h3>
  <p>
    You can combine multiple background properties into a single line using shorthand. The order should be:
    <em>background-color background-image background-repeat background-attachment background-position</em>
  </p>
<ExampleCode> 
{`body {
    background: #f1f1f1 url("bg.jpg") no-repeat fixed center;
 }`}
</ExampleCode>

            <h3> Conclusion</h3>
    <p>
      CSS background properties give you complete control over how visual backgrounds behave and appear in your webpage designs. 
      Whether you're adding a full image, adjusting color contrast, or fixing a static layout, backgrounds help define the overall aesthetics and feel of your site. 
    </p>
    <p>
       Understanding how to use them both individually and as a shorthand will allow you to build more engaging and modern interfaces.
    </p>

    <VideoBox 
        title='Background 1'
        code='ktlX6mq2VqA?si=HKO1QirYz7E7qiVy'
    />

    <VideoBox 
        title='Background 2'
        code='BruHvdeY-NA?si=zHgDnoZe-iXWBoNI'
    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_color" 
                nextPath="/css_border"
            />
        </section>
    );
}
