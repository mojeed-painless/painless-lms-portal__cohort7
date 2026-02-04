import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Lists() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Lists</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
            <p>In HTML, lists are created using the <code>&lt;ul&gt;</code> (unordered list) or 
                <code>&lt;ol&gt;</code> (ordered list) tags. Each list item is defined using the 
                <code>&lt;li&gt;</code> tag.
            </p>

            <p>Property: <code>list-style-type</code></p>

            <p>The <code>list-style-type</code> property in CSS allows you to control the marker 
                (bullet or number style) of a list. You can apply it to both unordered and ordered lists.
            </p>

            <h3>Unordered List Values</h3>
            <ul>
                <li><code>disc</code> – Default bullet style</li>
                <li><code>circle</code> – Hollow bullet</li>
                <li><code>square</code> – Square bullet</li>
                <li><code>none</code> – No bullets</li>
            </ul>

            <h4>Example:</h4>
<ExampleCode>
{`ul {
    list-style-type: square;
 }`}    
</ExampleCode> 


            <h3>Ordered List Values</h3>
            <ul>
                <li><code>decimal</code> – 1, 2, 3, ... (default)</li>
                <li><code>lower-alpha</code> – a, b, c, ...</li>
                <li><code>upper-alpha</code> – A, B, C, ...</li>
                <li><code>lower-roman</code> – i, ii, iii, ...</li>
                <li><code>upper-roman</code> – I, II, III, ...</li>
            </ul>

            <h4>Example:</h4>

<ExampleCode>
{`ol {
    list-style-type: upper-roman;
 }`}    
</ExampleCode>

            <h3>Removing Default List Styling</h3>
            <p>Browsers apply default styling to lists, such as margin, padding, and list bullets or 
                numbers. You can remove them like this:
            </p>

<ExampleCode>
{`ul {
    list-style-type: none; 
    margin: 0; 
    padding: 0;
 }`}    
</ExampleCode> 

            <h3>Conclusion</h3>
            <p>Using <code>list-style-type</code>, you can customize your lists for better presentation. 
                Whether you're designing menus, outlines, or content lists, understanding this property 
                helps improve the look and feel of your website.
            </p>

    <VideoBox 
        title='Lists'
        code='WPuJ9D0f_Tk?si=E3B1ojKpu6tbOnSv'
    />
    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_links" 
                nextPath="/css_table"
            />
        </section>
    );
}
