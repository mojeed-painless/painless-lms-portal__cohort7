import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Transform() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Transform</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>The <code>transform</code> property in CSS allows you to visually manipulate an element’s shape, size, position, and rotation without affecting the document flow. This is widely used in animations, UI interactions, and responsive design effects.</p>

            <h4>Syntax:</h4>
<ExampleCode> 
{`selector {
    transform: function(value);
 }`}
</ExampleCode>

            <p>You can apply one or multiple transform functions at once.</p>

            <h3>Transform Functions:</h3>

            <h4>translate(x, y)</h4>
            <p>Moves the element from its original position.</p>
<ExampleCode> 
{`transform: translate(50px, 100px); /* 50px right, 100px down */`}
</ExampleCode>

            <h4>translateX(value) / translateY(value)</h4>
            <p>Move horizontally or vertically.</p>
<ExampleCode> 
{`transform: translateX(100px);
 transform: translateY(-50px);`}
</ExampleCode>

            <h4>rotate(angle)</h4>
            <p>Rotates the element clockwise (positive) or counter-clockwise (negative).</p>
<ExampleCode> 
{`transform: rotate(45deg);  /* Rotates 45 degrees clockwise */`}
</ExampleCode>

            <h4>scale(x, y)</h4>
            <p>Scales the element. Values &gt; 1 enlarge, values &lt; 1 shrink.</p>
<ExampleCode> 
{`transform: scale(1.5, 2);  /* 1.5 times wider, 2 times taller */`}
</ExampleCode>

            <h4>scaleX(value) / scaleY(value)</h4>
            <p>Scale only horizontally or vertically.</p>
<ExampleCode> 
{`transform: scaleX(2);`}
</ExampleCode>

            <h3>skew(x-angle, y-angle)</h3>
            <p>Skews the element along X and/or Y axes.</p>
<ExampleCode> 
{`transform: skew(30deg, 10deg);`}
</ExampleCode>

            <h4>skewX(value) / skewY(value)</h4>
            <p>Skew only one axis.</p>
<ExampleCode> 
{`transform: skewX(25deg);`}
</ExampleCode>

            <h4>matrix(a, b, c, d, e, f)</h4>
            <p>Applies all transformations using a matrix. Rarely used directly.</p>

            <h4>Multiple Transforms</h4>
<ExampleCode> 
{`transform: rotate(45deg) translateX(100px) scale(1.2);`}
</ExampleCode>

            <p><strong>Order matters</strong> – transforms are applied in sequence.</p>

            <h3>Use Cases:</h3>
            <ul>
                <li>Animate UI elements</li>
                <li>Create dynamic hover effects</li>
                <li>Rotate or move elements on scroll</li>
                <li>Zoom on click</li>
                <li>Card flips, loaders, sliders</li>
            </ul>

            <h4>Examples:</h4>

            <h3>Rotate on Hover</h3>
<ExampleCode> 
{`.box:hover {
    transform: rotate(180deg);
 }`}
</ExampleCode>

            <h3>Move and Scale</h3>
<ExampleCode> 
{`.box {
    transform: translate(50px, 0) scale(1.5);
 }`}
</ExampleCode>

            <h3>Skew on Interaction</h3>
<ExampleCode> 
{`.box:active {
    transform: skewX(20deg);
 }`}
</ExampleCode>

    <VideoBox 
        title='Transform'
        code='0BXG-fMTWF4'
    />
            
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_opacity" 
                nextPath="/css_transition"
            />
        </section>
    );
}
