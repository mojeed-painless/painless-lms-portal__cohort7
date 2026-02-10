import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function DisplayLayout() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Layout: Display</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <h3>Display Property</h3>
                        <p><strong>Block-level elements</strong>: Start on a new line and take full width. Examples include <code className="code">&lt;div&gt;</code>, <code className="code">&lt;h1&gt;</code> to <code className="code">&lt;h6&gt;</code>, <code className="code">&lt;p&gt;</code>, <code className="code">&lt;section&gt;</code></p>
                        <p><strong>Inline elements</strong>: Appear on the same line and take only the required width. Examples include <code className="code">&lt;span&gt;</code>, <code className="code">&lt;a&gt;</code>, <code className="code">&lt;img&gt;</code>, <code className="code">&lt;strong&gt;</code></p>
                        <p>You can override these using the <code className="code">display</code> property.</p>
                        <p><code className="code">display: block;</code> / <code className="code">display: inline;</code></p>

<ExampleCode language="html"> 
{`<span class="block-example">span as block</span>

<div class="inline-example">div as inline</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.block-example {
   display: block;
   background-color: lightblue;
}

.inline-example {
   display: inline;
   background-color: lightcoral;
}`}
</ExampleCode>

                        <h3>display: none; vs visibility: hidden;</h3>
                        <p><strong>display: none</strong>: Hides the element and removes it from the flow.</p>
                        <p><strong>visibility: hidden</strong>: Hides the element, but it still takes up space.</p>

<ExampleCode language="html"> 
{`<p class="none-example">This won't be visible at all.</p>

<p class="hidden-example">This is hidden but still takes space.</p>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.none-example {
   display: none;
}

.hidden-example {
   visibility: hidden;
}`}
</ExampleCode>


                        

                         {/* <h3>Float and Clear Property</h3>
                        <p><code className="code">float</code>: Makes elements float beside each other.</p>
                        <p><code className="code">clear</code>: Stops the float behavior.</p>

<pre>
&lt;div class="float-left"&gt;Left Float&lt;/div&gt;
&lt;div class="float-right"&gt;Right Float&lt;/div&gt;
&lt;div class="clear-fix"&gt;This clears the floats above.&lt;/div&gt;

.float-left {
  float: left;
  width: 150px;
  height: 100px;
  background-color: pink;
}

.float-right {
  float: right;
  width: 150px;
  height: 100px;
  background-color: lightblue;
}

.clear-fix {
  clear: both;
  background-color: gray;
  padding: 10px;
}
</pre> */}

    <VideoBox 
        title='Disply property'
        code='xrZ7R4gOkJ0?si=NUiejQF5epSMgcfM'
    />
    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_icon" 
                nextPath="/css_overflow"
            />
        </section>
    );
}
