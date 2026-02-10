import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function OverflowLayout() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Layout: Overflow</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                The <code className="code">overflow</code> property in CSS controls what happens when content is too large to fit 
                in an element’s box.
                It's useful for handling long text, images, or dynamic content that exceeds its container.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`overflow: visible;
overflow: hidden;
overflow: scroll;
overflow: auto;`}
</ExampleCode>

            <h4>Values</h4>
            <ul>
                <li><strong>visible</strong> (default): Content spills outside the box — no clipping or scrolling.</li>
                <li><strong>hidden</strong>: Extra content is clipped and not visible — no scrollbars.</li>
                <li><strong>scroll</strong>: Scrollbars are always shown even if content fits — enables scrollability.</li>
                <li><strong>auto</strong>: Adds scrollbars only when content overflows.</li>
            </ul>

            <h4>Overflow Example: <code className="code">auto</code></h4>
<ExampleCode language="html"> 
{`<div class="scroll-box">
   This is a long content that overflows: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo voluptatem, necessitatibus sapiente eligendi sint quaerat nisi neque ipsa quos. Quaerat porro sapiente dolor corrupti cupiditate exercitationem voluptatibus soluta excepturi sint!<br>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.scroll-box {
   width: 300px;
   height: 100px;
   overflow: auto;
   background-color: lightyellow;
   padding: 10px;
}`}
</ExampleCode>

            <h4>Overflow Example: <code className="code">hidden</code></h4>
<ExampleCode language="css"> 
{`.scroll-box {
   width: 200px;
   height: 60px;
   overflow: hidden;
   background-color: #e6e6fa;
   padding: 10px;
}`}
</ExampleCode>

            <h4>Overflow Example: <code className="code">scroll</code></h4>
<ExampleCode language="css"> 
{`.scroll-box {
   width: 200px;
   height: 60px;
   overflow: scroll;
   background-color: #ffe4e1;
   padding: 10px;
}`}
</ExampleCode>

            <h3>Related Properties</h3>

            <h4>overflow-x and overflow-y</h4>
            <p>These control the horizontal and vertical overflow separately.</p>

<ExampleCode language="css"> 
{`overflow-x: auto;
overflow-y: hidden;`}
</ExampleCode>

            <h4>Shorthand Use:</h4>
            <p>
                You can combine both in one line like:
            </p>
<ExampleCode language="css"> 
{`overflow: auto hidden;  /* x is auto, y is hidden */`}
</ExampleCode>

            <h3>Use Cases</h3>
            <ul>
                <li>Scroll boxes for long comments, code blocks, or chat apps</li>
                <li>Cut off content cleanly using <code className="code">overflow: hidden</code></li>
                <li>Image galleries or sliders</li>
                <li>Prevent layout breaking by limiting overflow</li>
            </ul>

    <VideoBox 
        title='Overflow 1'
        code='xE-UpU4H_Ak?si=RdvGwIAjLNlD_UuW'
    />

    <VideoBox 
        title='Overflow 2'
        code='d4ervYdxzxk?si=wFcc0E2wkaei7xFN'
    />


 <hr />

<div class="exercise">
    
    <h3>Practice Exercise</h3>

    <p>Instructions:</p>

    <ol>
        <li>Create your own image gallery</li>
        <li>Images could be anything; animals, flowers, cars, etc.</li>
        <li>Make sure to add a heading and proper stylings </li>
    </ol>
</div>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_display" 
                nextPath="/css_position"
            />
        </section>
    );
}
