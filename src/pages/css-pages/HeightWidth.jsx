import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function HeightWidth() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Height & Width</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>In CSS, the <code className="code">height</code> and <code className="code">width</code> properties define the size of an element’s content area. These are foundational for building well-structured and responsive designs.</p>

  <p>By default, the width of block-level elements (like <code className="code">&lt;div&gt;</code> ) spans the entire width of its parent container, while the height adjusts to the content inside it. But CSS gives you control over both.</p>
  
    <h3>Width</h3>
  <p>The <code className="code">width</code> property defines how wide an element should be. By default, block-level elements like <code className="code">&lt;div&gt;</code> stretch to the full width of their container, but you can control that:</p>

<ExampleCode language="css"> 
{`div {
    width: 300px;
}`}
</ExampleCode>

  <p><b> Common units for width:</b></p>
  <ul>
    <li><code className="code">px</code> – pixels</li>
    <li><code className="code">%</code> – percentage of the parent</li>
    <li><code className="code">vw</code> – viewport width</li>
    <li><code className="code">em/rem</code> – relative to font size</li>
  </ul>

  <h3>Height</h3>
  <p>The <code className="code">height</code> property controls how tall an element should be. You can set it like this:</p>

<ExampleCode language="css"> 
{`div {
    height: 150px;
}`}
</ExampleCode>

  <p>It accepts the same units as width: px, %, vh, em, etc.</p>

  <h3>Other Related Properties</h3>
  <ul>
    <li><code className="code">max-width</code>: Limits how wide an element can become</li>
    <li><code className="code">min-width</code>: Ensures a minimum width</li>
    <li><code className="code">max-height</code>: Prevents it from growing too tall</li>
    <li><code className="code">min-height</code>: Ensures minimum vertical space</li>
    <li><code className="code">auto</code>: Automatically adjusts to fit content</li>
  </ul>

  <h3>width and margin: auto;</h3>
                        <p><code className="code">width</code> restricts the full width of a block element.</p>
                        <p><code className="code">margin: auto</code> centers the element horizontally.</p>

<ExampleCode language="html"> 
{`<div class="center-box">Centered Box</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.center-box {
   width: 300px;
   margin: auto;
   background-color: lightgreen;
}`}
</ExampleCode>

  <h3>Conclusion</h3>
  <p>Mastering height and width gives you better control over layout, responsiveness, and visual consistency. Use percentage and viewport-based units for flexibility, and combine with <code className="code">min-</code> and <code className="code">max-</code> values for better responsiveness.</p>



    <VideoBox 
        title='Height & Width'
        code='Y4hOPkC0PFA?si=b5pHLf0TwLHB6kC8'
    />



                        <hr />
<div className="exercise">
    
    <h3>Practice Exercise</h3>

    <p>Instructions:</p>

    <ol>
        <li>Create three different boxes, x, y and z with the following styling</li>
        <li>x: content(This is a blue box), padding(25px), margin(25px), border-radius(10px)</li>
        <li>y: content(This is a red box), width(30px), height(25px), padding(12px), border(10px)</li>
        <li>z: content(This is a brown box), width(120px), padding(15px), border-radius(50%), placed at the center of the page</li>
    </ol>
</div>
                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Height & Width" />
            <PrevNextBtn 
              prevPath="/css_boxmodel" 
              nextPath="/css_formatting"
              
            />
        </section>
    );
}
