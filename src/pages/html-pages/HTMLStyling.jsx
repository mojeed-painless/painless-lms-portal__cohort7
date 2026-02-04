import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';

export default function HTMLStyling() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Styling</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
    HTML styling allows you to apply CSS (Cascading Style Sheets) directly within an HTML tag using the <code>style</code> attribute.
    It’s one of the simplest ways to apply quick visual formatting without using a separate CSS file or internal stylesheet.
  </p>

  <h3>What can we style inline?</h3>

  <ul>
    <li>Text color</li>
    <li>Font size</li>
    <li>Background color</li>
    <li>Margins and padding</li>
    <li>Border and width</li>
    <li>Text alignment</li>
    <li>And more...</li>
  </ul>

  <h3>Syntax</h3>

<ExampleCode>
{`<tag style="property: value;">Content</tag>`}
</ExampleCode>

  <h4>Examples</h4>

  <h3>Background Color</h3>
<ExampleCode>
{`<div style="background: blue;">
    This div has a blue background.
 </div>`}
</ExampleCode>

  <h3>Font Size</h3>
<ExampleCode>
{`<p style="font-size: 18px;">
    This paragraph has a larger font size.
 </p>`}
</ExampleCode>

  <h3>Multiple Styles</h3>
<ExampleCode>
{`<h2 style="color: #ff6600; background: #f0f0f0; padding: 10px; border-radius: 5px;">
    Styled Heading
 </h2>`}
</ExampleCode>

  <h3>When to Use html Styling</h3>

  <p>
    HTML styling is best for quick testing or when applying a one-off style to a single element. 
  </p>

  <h3 className="bold">
    For larger projects, it is recommended to use internal or external stylesheets for better structure, reusability, and cleaner code.
  </h3>

    <VideoBox 
        title='Adding styling within html'
        code='cfsRLanIjTw?si=TlklC8mi5X0tYQVF'
    />

  <hr />


<div className="exercise">
    
    <h3>Practice Exercise</h3>

    <p>Instructions:</p>

    <ol>
        <li>Create an application form for a new established school</li>
        <li>Add inputs as much as possible to receive students' information</li>
        <li>Add some touch of styling</li>
    </ol>
</div>
                </div>
            </section>

            <TakeQuizButton topicId="html-style" />

            <PrevNextBtn 
                prevPath="/html-form" 
                nextPath="/css-transition"
            />
        </section>
    );
}
