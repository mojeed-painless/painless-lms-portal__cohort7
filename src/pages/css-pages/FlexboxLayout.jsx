import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function FlexboxLayout() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Layout: Flexbox</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <h3>What is Flexbox?</h3>
            <p>Flexbox, or the Flexible Box Layout, is a layout model that allows 
            responsive alignment and distribution of elements within a container, even when 
            their size is unknown or dynamic.
            </p>

            <p><strong>To use Flexbox:</strong></p>
<ExampleCode> 
{`display: flex; /* enables flexbox */`}
</ExampleCode>

            <h3>Flex Container Properties</h3>

            <h4>display</h4>
<ExampleCode> 
{`display: flex;      /* horizontal layout */`}
</ExampleCode>

            <h4>flex-direction</h4>
            <p>Defines the direction of the main axis.</p>
<ExampleCode> 
{`flex-direction: row;   /* default */
 flex-direction: row-reverse;
 flex-direction: column;
 flex-direction: column-reverse;`}
</ExampleCode>

            <h4>flex-wrap</h4>
            <p>Allows items to wrap onto multiple lines.</p>
<ExampleCode> 
{`flex-wrap: nowrap;    /* default */
 flex-wrap: wrap;
 flex-wrap: wrap-reverse;`}
</ExampleCode>

            <h4>flex-flow</h4>
            <p>Shorthand for flex-direction and flex-wrap.</p>
<ExampleCode> 
{`flex-flow: row wrap;`}
</ExampleCode>

            <h4>justify-content</h4>
            <p>Aligns items along the main axis.</p>
<ExampleCode> 
{`justify-content: flex-start; /* default */
 justify-content: flex-end;
 justify-content: center;
 justify-content: space-between;
 justify-content: space-around;`}
</ExampleCode>

            <h4>align-items</h4>
            <p>Aligns items across the main axis.</p>
<ExampleCode> 
{`align-items: stretch;  /* default */
 align-items: flex-start;
 align-items: flex-end;
 align-items: center;
 align-items: baseline;`}
</ExampleCode>

            <h4>align-content</h4>
            <p>Aligns rows of items when there is extra space (multi-line flex).</p>
<ExampleCode> 
{`align-content: flex-start;
 align-content: flex-end;
 align-content: center;
 align-content: space-between;
 align-content: space-around;
 align-content: stretch; /* default */`}
</ExampleCode>

            <h3>Flex Item Properties</h3>

            <h4>order</h4>
            <p>Defines item order.</p>
<ExampleCode> 
{`order: 0;  /* 0 is the default */`}
</ExampleCode>

            <h4>flex-grow</h4>
            <p>Defines how much an item should grow.</p>
<ExampleCode> 
{`flex-grow: 1;`}
</ExampleCode>

            <h4>flex-shrink</h4>
            <p>Defines how items shrink when necessary.</p>
<ExampleCode> 
{`flex-shrink: 1; /* default */`}
</ExampleCode>

            <h4>flex-basis</h4>
            <p>Defines the initial size of the item.</p>
<ExampleCode> 
{`flex-basis: auto; /* default */`}
</ExampleCode>

            <h4>flex</h4>
            <p>Shorthand for grow, shrink, basis.</p>
<ExampleCode> 
{`flex: 1 0 200px;`}
</ExampleCode>

            <h4>align-self</h4>
            <p>Overrides align-items for individual items.</p>
<ExampleCode> 
{`align-self: auto;
 align-self: flex-start;
 align-self: center;
 align-self: flex-end;
 align-self: stretch;`}
</ExampleCode>

            <h3>Flexbox Example</h3>

<ExampleCode> 
{`<div class="flex-container">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
 </div>

 .flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    border: 1px solid black;
 }

 .flex-container div {
    background: lightblue;
    padding: 20px;
 }`}
</ExampleCode>

    <VideoBox 
        title='Flexbox 1'
        code='AvcRV2tr8I0?si=dZ6oKvB2q3m1KKVC'
    />

    <VideoBox 
        title='Flexbox 2'
        code='JkS9AmBGvVs?si=x-RQku0a09OfazHO'
    />

    <VideoBox 
        title='Flexbox 3'
        code='9DTxka3Q5nc?si=ly-peut5n4kub23R'
    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_position" 
                nextPath="/css_grid"
            />
        </section>
    );
}
