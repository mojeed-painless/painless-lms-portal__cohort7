import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function Combinators() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Combinators</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>In CSS, combinators define relationships between selectors, allowing you to 
                target elements based on their position or relationship in the CSS 
                structure. This is essential for building efficient and organized CSS rules.
            </p>

            <p>There are four primary combinators in CSS:</p>

            <h3>Descendant Selector (space)</h3>
            <p>Selects all elements that are descendants (children, grandchildren, etc.) of 
                a specified element.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`parent descendant { 
   /* styles */ 
}`}
</ExampleCode>

            <h4>Example:</h4>
<ExampleCode language="html"> 
{`<h2>Descendant Selector Example</h2>

<div class="parent">
   <p>This is a child paragraph.</p>
   <div>
       <p>This is a grandchild paragraph.</p>
   </div>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.parent p {
    color: green;
}`}
</ExampleCode>
            <p><strong>Explanation:</strong> All <code className="code">&lt;p&gt;</code> elements inside 
                <code className="code">.parent</code> will be green, no matter how deeply nested.
            </p>

            <h3>Child Selector (&gt;)</h3>
            <p>Selects only the direct children of a specified element.</p>
            
            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`parent > child { 
   /* styles */ 
}`}
</ExampleCode>

            <h4>Example:</h4>
<ExampleCode language="html"> 
{`<h2>Child Selector Example</h2>

<div class="parent">
   <p>This is a direct child paragraph.</p>
   <div>
       <p>This is a nested paragraph.</p>
   </div>
   <p>This is another direct child paragraph.</p>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.parent > p {
    color: red;
}`}
</ExampleCode>

            <p><strong>Explanation:</strong> Only the first and third &lt;p&gt; (direct children of 
                <code className="code">.parent</code>) will be red. The nested &lt;p&gt; will not be 
                affected.
            </p>

            <h3>Adjacent Sibling Selector (+)</h3>
            <p>Selects the element that is immediately after a specified element and has 
                the same parent.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`element1 + element2 { 
   /* styles */ 
}`}
</ExampleCode>

            <h4>Example:</h4>
<ExampleCode language="html"> 
{`<h2>Adjacent Sibling Selector Example</h2>

<div>
   <h3>Heading</h3>
   <p>This paragraph comes immediately after the heading.</p>
   <p>This paragraph is not affected.</p>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`h3 + p {
    color: blue;
}`}
</ExampleCode>
            <p><strong>Explanation:</strong> Only the first &lt;p&gt; after the &lt;h3&gt; 
                will be blue. The second &lt;p&gt; won't be affected.
            </p>


            <h3>General Sibling Selector (~)</h3>
            <p>Selects all siblings of an element that come after it and share the same
                parent.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`element1 ~ element2 { 
   /* styles */ 
}`}
</ExampleCode>

            <h4>Example:</h4>
<ExampleCode language="html"> 
{`<h2>General Sibling Selector Example</h2>

<div>
   <h4>Heading</h4>
   <p>Paragraph 1 after heading</p>
   <p>Paragraph 2 after heading</p>
   <span>Span after heading</span>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`h4 ~ p {
    color: purple;
}`}
</ExampleCode>
            <p><strong>Explanation:</strong> Both &lt;p&gt; tags after &lt;h4&gt; will be 
                purple because they are siblings of the &lt;h4&gt;.
            </p>


            <h3>Summary Table of Combinators:</h3>
            
            <table border="1" cellpadding="8" cellspacing="0">
                <thead>
                <tr>
                    <th>Combinator</th>
                    <th>Symbol</th>
                    <th>Meaning</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Descendant</td>
                    <td>space</td>
                    <td>All elements inside the specified ancestor</td>
                </tr>
                <tr>
                    <td>Child</td>
                    <td>&gt;</td>
                    <td>Direct children only</td>
                </tr>
                <tr>
                    <td>Adjacent Sibling</td>
                    <td>+</td>
                    <td>The very next sibling</td>
                </tr>
                <tr>
                    <td>General Sibling</td>
                    <td>~</td>
                    <td>All next siblings of the same parent</td>
                </tr>
                </tbody>
            </table>



    <VideoBox 
        title='Combinators'
        code='Xmc10gmGz_4'
    />


                </div>
            </section>

            <QuizBox currentCategory="css2" currentTopic="Combinators" />
            <PrevNextBtn 
                prevPath="/css_grid" 
                nextPath="/css_pseudoclass"
            />
        </section>
    );
}
