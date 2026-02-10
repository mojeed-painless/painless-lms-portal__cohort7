import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function BoxShadow() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Box Shadow</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>The <code className="code">box-shadow</code> property in CSS adds shadow effects around an element’s frame. You can create one or more shadows using this property. It can be used to create depth, highlight elements, or create stylish UI effects.</p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`selector {
   box-shadow: h-offset v-offset blur spread color inset;
}`}
</ExampleCode>

            <ul>
                <li><strong>h-offset</strong> (required): Horizontal shadow. Positive = right, Negative = left.</li>
                <li><strong>v-offset</strong> (required): Vertical shadow. Positive = down, Negative = up.</li>
                <li><strong>blur</strong> (optional): Blurring distance of the shadow. The higher the number, the more blurred.</li>
                <li><strong>spread</strong> (optional): Size of the shadow. Positive = expand, Negative = shrink.</li>
                <li><strong>color</strong> (optional): Shadow color. Can use any CSS color.</li>
                <li><strong>inset</strong> (optional): Changes the shadow from outer to inner shadow.</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Basic Shadow</h3>
<ExampleCode language="css"> 
{`box-shadow: 5px 5px 10px gray;`}
</ExampleCode>

            <p>Adds a shadow 5px right and 5px down, blurred 10px, gray in color.</p>

            <h3>Shadow With Spread</h3>
<ExampleCode language="css"> 
{`box-shadow: 5px 5px 10px 5px blue;`}
</ExampleCode>

            <p>Shadow spreads 5px beyond the blurred area.</p>

            <h3>Inset Shadow</h3>
<ExampleCode language="css"> 
{`box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.5);`}
</ExampleCode>
  
            <p>Creates an inner shadow inside the element.</p>

            <h3>Multiple Shadows</h3>
<ExampleCode language="css"> 
{`box-shadow: 2px 2px 5px red, -2px -2px 5px green;`}
</ExampleCode>
            <p>Adds multiple shadows in different directions and colors.</p>

            <h3>No Blur and Spread</h3>
<ExampleCode language="css"> 
{`box-shadow: 10px 10px black;`}
</ExampleCode>
            <p>Sharp edge shadow without blur or spread.</p>

            <h3>Use Cases:</h3>
            <ul>
                <li>Simulate depth (like cards or modals)</li>
                <li>Add hover effects</li>
                <li>Highlight important content</li>
                <li>Create glassmorphism or neumorphism designs</li>
            </ul>

    <VideoBox 
        title='Box Shadow'
        code='rOnCnICaqn8'
    />
          
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_attribute" 
                nextPath="/css_opacity"
            />
        </section>
    );
}
