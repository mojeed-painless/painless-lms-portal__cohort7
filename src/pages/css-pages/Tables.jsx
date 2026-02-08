import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Tables() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Tables</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>In HTML, tables are used to display tabular data. However, default HTML 
                            tables can look plain. CSS allows you to style them for better aesthetics 
                            and readability.
                        </p>

                        <h3>Border Property</h3>
                        <p>The <code className="code">border</code> property is used to add borders around the table, 
                            table rows <code className="code">&lt;tr&gt;</code>, table headers <code className="code">&lt;th&gt;</code>, and table data cells 
                            <code className="code">&lt;td&gt;</code>.
                        </p>

<ExampleCode> 
{`table, th, td {
    border: 1px solid black;
 }`}
</ExampleCode>

                        <p>This adds a 1-pixel solid black border to the table and all its cells.</p>

                        <h3>Table Width</h3>
                        <p>You can control how wide your table is using the <code className="code">width</code> property.</p>

                        <h4>Full width table:</h4>
<ExampleCode> 
{`table {
    width: 100%;
 }`}
</ExampleCode>

                        <p>This will stretch the table across the entire width of its container.</p>

                        <h4>Fixed width table:</h4>
<ExampleCode> 
{`table {
    width: 500px;
 }`}
</ExampleCode>

                        <p>This sets the table width to 500 pixels.</p>

                        <h3>Border Collapse</h3>
                        <p>By default, table cells have separate borders. You can use the 
                            <code className="code">border-collapse</code> property to collapse them into a single border.
                        </p>

<ExampleCode> 
{`table {
    border-collapse: collapse;
 }`}
</ExampleCode>

                        <h3>Table Height</h3>
                        <p>You can use the <code className="code">height</code> property to set the height of the table 
                            or individual cells.
                        </p>

<ExampleCode> 
{`td {
    height: 50px;
 }`}
</ExampleCode>

                        <h3>Text Alignment</h3>
                        <p>You can align text inside table cells using <code className="code">text-align</code>.</p>

<ExampleCode> 
{`th, td {
    text-align: center;
 }`}
</ExampleCode>

                        <p>Other values include <code className="code">left</code> and <code className="code">right</code>.</p>

                        <h3>Hoverable Table Rows</h3>
                        <p>You can highlight rows when a user hovers over them:</p>

<ExampleCode> 
{`tr:hover {
    background-color: #f2f2f2;
 }`}
</ExampleCode>


    <VideoBox 
        title='Tables 1'
        code='ey1B_ib80v0?si=NoL38_jZyaq0gUkQ'
    />


    <VideoBox 
        title='Tables 2'
        code='4E4cP58j9mY?si=OpQ15z-09BpdfRxM'
    />
    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_lists" 
                nextPath="/css_icon"
            />
        </section>
    );
}
