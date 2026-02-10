import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function GridLayout() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Layout: Grid</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <h3>What is CSS Grid?</h3>
                        <p>
                            CSS Grid Layout is a powerful 2-dimensional system that allows you to 
                            design web layouts using rows and columns simultaneously.
                        </p>

                        <h3>Grid Container Properties</h3>

                        <h4>display</h4>
                        <p>Defines the element as a grid container.</p>

<ExampleCode language="css"> 
{`display: grid;`}
</ExampleCode>

            <h4>grid-template-columns &amp; grid-template-rows</h4>
            <p>Defines the number and size of the columns and rows.</p>
<ExampleCode language="css"> 
{`grid-template-columns: 100px 200px auto;
grid-template-rows: 100px auto;

/* OR using repeat and fraction units */ 
grid-template-columns: repeat(3, 1fr);`}
</ExampleCode>

            <h4>gap</h4>
            <p>Sets spacing between grid rows and columns.</p>
<ExampleCode language="css"> 
{`gap: 10px;
row-gap: 10px;
column-gap: 20px;`}
</ExampleCode>

            <h4>justify-items</h4>
            <p>Aligns items horizontally (along the row axis).</p>

<ExampleCode language="css"> 
{`justify-items: start;
justify-items: end;
justify-items: center;
justify-items: stretch;`}
</ExampleCode>

            <h4>align-items</h4>
            <p>Aligns items vertically (along the column axis).</p>
<ExampleCode language="css"> 
{`align-items: start;
align-items: end;
align-items: center;
align-items: stretch;`}
</ExampleCode>

            <h4>justify-content and align-content</h4>
            <p>Controls alignment of the grid itself inside the grid container.</p>
<ExampleCode language="css"> 
{`justify-content: start;
justify-content: end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: stretch;

align-content: start;
align-content: end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: stretch;`}
</ExampleCode>

            <h3>Grid Item Properties</h3>

            <h4>grid-column &amp; grid-row</h4>
            <p>
                These properties control how many columns or rows an item should span, 
                or where it starts and ends.
            </p>

            <h4>Syntax:</h4>
<ExampleCode language="css"> 
{`grid-column: start / end;`}
</ExampleCode>

            <h4>Example:</h4>
<ExampleCode language="css"> 
{`grid-column: 1 / 3;  /* spans from column 1 to column 3 */
grid-row: 2 / 4;      /* spans from row 2 to row 4 */`}
</ExampleCode>

            <h4>grid-area</h4>
            <p>
                Used to name a grid item so that it can be placed using 
                <code className="code">grid-template-areas</code>.
            </p>
            <p>Also works as a shorthand for <code className="code">grid-row-start / grid-column-start 
                / grid-row-end / grid-column-end</code>.
            </p>
<ExampleCode language="css"> 
{`grid-area: header;
grid-area: 1 / 1 / 2 / 3;  /* row-start / col-start / row-end / col-end */`}
</ExampleCode>

            <h4>justify-self / align-self</h4>
            <p>
                Align a single grid item independently inside its grid area.<br />
                They work like <code className="code">align-self</code> in Flexbox but for both horizontal 
                and vertical alignment.
            </p>
<ExampleCode language="css"> 
{`justify-self: start;
justify-self: end;
justify-self: center;
justify-self: stretch;
 
align-self: start;
align-self: end;
align-self: center;
align-self: stretch;`}
</ExampleCode>

  <h3>Grid Example</h3>

<ExampleCode language="html"> 
{`<div class="grid-container">
   <div>1</div>
   <div>2</div>
   <div>3</div>
   <div>4</div>
</div>`}
</ExampleCode>
<ExampleCode language="css"> 
{`.grid-container {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   grid-template-rows: auto auto;
   gap: 10px;
}

.grid-container div {
   background: peachpuff;
   padding: 20px;
}`}
</ExampleCode>

    <VideoBox 
        title='Grid 1'
        code='y2v1olAWtN8'
    />

    <VideoBox 
        title='Grid 2'
        code='Rwf0f8rQYMA'
    />
    

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_flexbox" 
                nextPath="/css_conbinator"
            />
        </section>
    );
}
