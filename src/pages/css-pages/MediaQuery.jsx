import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function MediaQuery() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Media Query</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>Media queries allow you to apply CSS rules based on device characteristics 
                such as screen size, orientation, and resolution. This makes your website 
                responsive and adaptable to various devices.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`@media media-type and (condition) {
   /* CSS rules */
}`}
</ExampleCode>

            <h3>Common Media Features:</h3>
            <ul>
                <li><strong>max-width</strong>: Maximum viewport width</li>
                <li><strong>min-width</strong>: Minimum viewport width</li>
                <li><strong>orientation</strong>: Device orientation (portrait or landscape)</li>
                <li><strong>resolution</strong>: Screen resolution (DPI)</li>
                <li><strong>aspect-ratio</strong>: Width-to-height ratio</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Change Background Color When Screen Width is ≤ 600px</h3>
<ExampleCode language="html"> 
{`<div class="color-change">Change is detected when you resize your browser below 600px</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.color-change {
    width: 100%;
    padding: 20px;
    background-color: lightgray;
    margin-bottom: 20px;
    text-align: center;
}
    
@media (max-width: 600px) {
    .color-change {
      background-color: lightblue;
    }
}`}
</ExampleCode>

            <h3>Hide Element on Screens Smaller Than 500px</h3>
<ExampleCode language="html"> 
{`<div class="hide-on-small">I will disappear on small screens</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.hide-on-small {
    width: 100%;
    padding: 20px;
    background-color: lightgray;
    margin-bottom: 20px;
    text-align: center;
}
    
@media (max-width: 500px) {
    .hide-on-small {
        display: none;
    }
}`}
</ExampleCode>

            <h3>Column Layout on Larger Screens</h3>
<ExampleCode language="html"> 
{`<div class="column-layout">
   <div class="box">Column 1</div>
   <div class="box">Column 2</div>
   <div class="box">Column 2</div>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.box {
    width: 100%;
    padding: 20px;
    background-color: lightgray;
    margin-bottom: 20px;
    text-align: center;
}
    
.column-layout {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .column-layout {
        flex-direction: row;
        gap: 10px;
    }
    .column-layout > div {
        flex: 1;
    }
}`}
</ExampleCode>

            <h3>Conclusion:</h3>
            <p>Media queries are a core feature of responsive web design. They allow different styles based on screen sizes and other properties, ensuring your website looks great on all devices.</p>

    <VideoBox 
        title='Media Query'
        code='3Is-xwSnC2M?si=M4fPRJi7QGtH0vyo'
    />
 
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_animation" 
                nextPath="/css_form"
            />
        </section>
    );
}
