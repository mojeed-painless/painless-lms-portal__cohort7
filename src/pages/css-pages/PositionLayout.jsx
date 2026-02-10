import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function PositionLayout() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Layout: Position</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>The position property determines how an element is placed in the document layout. It affects the 
                positioning behavior of the element relative to its parent, document, or scroll position.
            </p>

            <h4>Syntax</h4>
<ExampleCode language="css"> 
{`selector {
   position: static;
   position: relative;
   position: absolute;
   position: fixed;
   position: sticky;
}`}
</ExampleCode>

            <h3>static (default)</h3>
            <p>This is the default position for every HTML element.</p>
            <ul>
                <li>The element flows naturally with the document (i.e., in the order it appears in HTML).</li>
                <li>No top, right, bottom, or left values apply.</li>
            </ul>
<ExampleCode language="css"> 
{`div {
   position: static;
   /* top, left, etc. won't affect anything */
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> When you want elements to appear in the normal document flow without 
                positioning tricks.
            </p>

            <h3>relative</h3>
            <p>The element remains in the normal document flow, but you can offset it using top, right, bottom, and left.</p>
            <ul>
                <li>Other elements are not affected by this shift — they still act as if the element was in its original spot.</li>
            </ul>
<ExampleCode language="css"> 
{`.relative-box {
   position: relative;
   top: 20px;
   left: 40px;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> When you need to nudge an element while keeping its original space in layout (e.g., for animation or decoration).</p>

            <h3>absolute</h3>
            <ul>
                <li>Removes the element from normal flow (no space is reserved for it).</li>
                <li>Positioned relative to the nearest positioned ancestor (i.e., parent with position: relative, absolute, or fixed).</li>
                <li>If no such ancestor exists, it’s positioned relative to the <code className="code">&lt;html&gt;</code> (viewport).</li>
                <li>Accepts top, right, bottom, and left.</li>
            </ul>
<ExampleCode language="css"> 
{`.absolute-box {
   position: absolute;
   top: 10px;
   left: 100px;
}`}
</ExampleCode>
  
            <p><strong>Use Case:</strong> For tooltips, dropdowns, modals, or placing something exactly where you want inside a parent container.</p>

            <h3>fixed</h3>
            <ul>
                <li>Removed from document flow.</li>
                <li>Positioned relative to the browser window, not any parent.</li>
                <li>Stays in place when the page is scrolled.</li>
            </ul>

<ExampleCode language="css"> 
{`.fixed-header {
   position: fixed;
   top: 0;
   width: 100%;
   background: black;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Sticky navbars, back-to-top buttons, floating footers, etc.</p>

            <h3>sticky</h3>
            <ul>
                <li>A hybrid of relative and fixed.</li>
                <li>Acts like relative until a scroll threshold is crossed, then it behaves like fixed.</li>
                <li>Requires top, left, etc., to define when it "sticks".</li>
                <li>Needs a scrollable parent with enough height.</li>
            </ul>

<ExampleCode language="css"> 
{`.sticky-bar {
   position: sticky;
   top: 0;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Sticky headers, table headings that stick as you scroll, etc.</p>

            <h3>Interactions with z-index</h3>

            <h4>z-index Property</h4>
            <p>Controls the stacking order of overlapping elements.</p>
            <ul>
                <li>Higher z-index = in front.</li>
                <li>Only works on positioned elements (relative, absolute, fixed, sticky).</li>
            </ul>
<ExampleCode language="html"> 
{`<div class="z1">Box 1</div>
<div class="z2">Box 2 (on top)</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.z1 {
   position: absolute;
   background-color: red;
   z-index: 1;
}

.z2 {
   position: absolute;
   background-color: blue;
   z-index: 2;
}`}
</ExampleCode>

            <p><strong>Use Case:</strong> Control layer priority — like showing a modal over a darkened background, keeping buttons above images, etc.</p>

            <h3>Tips &amp; Gotchas</h3>
            <ul>
                <li><code className="code">absolute</code> will not work as expected unless a parent is positioned.</li>
                <li><code className="code">sticky</code> may not work if:
                <ul>
                    <li>Its parent has <code className="code">overflow: hidden</code>.</li>
                    <li>It’s not within a scrollable container.</li>
                </ul>
                </li>
                <li>Always use <code className="code">z-index</code> on a positioned element.</li>
                <li><code className="code">fixed</code> can cause layout shifts if you don’t reserve space for it.</li>
            </ul>

    <VideoBox 
        title='Position 1'
        code='reBJ6ncSMK0?si=8vVdVrRT-hOor2ZB'
    />

    <VideoBox 
        title='Position 2'
        code='FWG-7ASnG0Y?si=4CZFlLHyB8VwlGEC'
    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_overflow" 
                nextPath="/css_flexbox"
            />
        </section>
    );
}
