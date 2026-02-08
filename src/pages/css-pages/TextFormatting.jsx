import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function TextFormatting() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Text Formatting</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <h3>✅ Text Alignment and Direction</h3>

                        <p>CSS provides a range of properties to control the positioning and flow of text on your web pages. These properties affect horizontal and vertical alignment as well as reading direction.</p>

                        <h4>Key properties</h4>
                        <ul>
                            <li><strong>text-align</strong></li>
                            <li><strong>text-align-last</strong></li>
                            <li><strong>direction</strong></li>
                            <li><strong>unicode-bidi</strong></li>
                            <li><strong>vertical-align</strong></li>
                        </ul>

                        <h3>text-align</h3>
                        <p>Used to align text horizontally. Acceptable values include: <code className="code">left</code>, <code className="code">right</code>, <code className="code">center</code>, and <code className="code">justify</code>.</p>
<ExampleCode> 
{`p {
    text-align: center;
 }`}
</ExampleCode>

                        <h3>text-align-last</h3>
                        <p>Aligns only the last line of a paragraph. Values include: <code className="code">left</code>, <code className="code">right</code>, <code className="code">center</code>, <code className="code">justify</code>.</p>
<ExampleCode> 
{`p {
    text-align-last: justify;
 }`}
</ExampleCode>

                        <h3>direction &amp; unicode-bidi</h3>
                        <p>These properties control the reading direction of text. Useful for supporting right-to-left languages.</p>
                        <ul>
                            <li><code className="code">direction: rtl;</code></li>
                            <li><code className="code">unicode-bidi: bidi-override;</code></li>
                        </ul>
<ExampleCode> 
{`p {
    direction: rtl;
    unicode-bidi: bidi-override;
 }`}
</ExampleCode>

                        <h3>vertical-align</h3>
                        <p>Aligns an inline or inline-block element vertically. Values include:</p>
                        <ul>
                            <li>baseline</li>
                            <li>text-top</li>
                            <li>text-bottom</li>
                            <li>sub</li>
                            <li>super</li>
                        </ul>
<ExampleCode> 
{`span {
    vertical-align: super;
 }`}
</ExampleCode>

                        <h3>✅ Text Decoration</h3>
                        <p>The text-decoration set of properties allows you to add lines to text like underline, overline, and more — commonly used with links.</p>
                        
                        <h4>Key properties</h4>
                        <ul>
                            <li><strong>text-decoration-line</strong></li>
                            <li><strong>text-decoration-color</strong></li>
                            <li><strong>text-decoration-style</strong></li>
                            <li><strong>text-decoration-thickness</strong></li>
                        </ul>

                        <h3>text-decoration-line</h3>
                        <p>Defines the type of decoration line to use:</p>
                        <ul>
                            <li>underline</li>
                            <li>overline</li>
                            <li>line-through</li>
                        </ul>
<ExampleCode> 
{`h1 {
    text-decoration-line: underline;
 }`}
</ExampleCode>

                        <h3>text-decoration-style</h3>
                        <p>Controls the style of the decoration line:</p>
                        <ul>
                            <li>solid</li>
                            <li>double</li>
                            <li>dotted</li>
                            <li>dashed</li>
                            <li>wavy</li>
                        </ul>
<ExampleCode> 
{`h1 {
    text-decoration-style: wavy;
 }`}
</ExampleCode>
                        <h3>✅ Text Transformation</h3>
                        <p>Controls letter casing of your text using the <code className="code">text-transform</code> property. Options include:</p>
                        <ul>
                            <li>uppercase</li>
                            <li>lowercase</li>
                            <li>capitalize</li>
                        </ul>
<ExampleCode> 
{`p {
    text-transform: capitalize;
 }`}
</ExampleCode>

                        <h3>✅ Text Spacing</h3>
                        <p>These properties help you manage spacing between and within lines, characters, and paragraphs.</p>

                        <h4>Key properties</h4>
                        <ul>
                            <li><strong>text-indent</strong></li>
                            <li><strong>letter-spacing</strong></li>
                            <li><strong>line-height</strong></li>
                            <li><strong>word-spacing</strong></li>
                            <li><strong>white-space</strong></li>
                        </ul>

                        <h3>text-indent</h3>
                        <p>Sets the indentation of the first line of text, often used for paragraphs. Example: <code className="code">text-indent: 50px;</code></p>
<ExampleCode> 
{`p {
    text-indent: 50px;
 }`}
</ExampleCode>

                        <h3>letter-spacing</h3>
                        <p>Adjusts space between characters. Positive values increase space, negative values reduce it.</p>
<ExampleCode> 
{`h2 {
    letter-spacing: 2px;
 }`}
</ExampleCode>

                        <h3>line-height</h3>
                        <p>Specifies the vertical space between lines of text.</p>
<ExampleCode> 
{`p {
    line-height: 1.8;
 }`}
</ExampleCode>

                        <h3>word-spacing</h3>
                        <p>Adjusts the space between words in a line of text.</p>
<ExampleCode> 
{`p {
    word-spacing: 10px;
 }`}
</ExampleCode>

                        <h3>white-space</h3>
                        <p>Determines how white space is handled inside an element. Example value: <code className="code">nowrap</code>.</p>
<ExampleCode> 
{`p {
    white-space: nowrap;
 }`}
</ExampleCode>

                        <h3>✅ Text Shadow</h3>
                        <p>The <code className="code">text-shadow</code> property adds shadows behind text to create a 3D or glowing effect.</p>
                        <p>Syntax example:</p>
<ExampleCode> 
{`text-shadow: 2px 2px 5px red;`}
</ExampleCode>


                        <ul>
                            <li>1st value: horizontal offset</li>
                            <li>2nd value: vertical offset</li>
                            <li>3rd value: blur radius</li>
                            <li>4th value: shadow color</li>
                        </ul>

                        <h3>✅ Text Fonts</h3>
                        <p>Fonts determine the overall style and feel of text.</p>

                        <p>Font properties include:</p>
                        <ul>
                            <li><strong>font-family</strong></li>
                            <li><strong>font-style</strong></li>
                            <li><strong>font-weight</strong></li>
                            <li><strong>font-variant</strong></li>
                            <li><strong>font-size</strong></li>
                        </ul>

                        <h3>font-family</h3>
                        <p>Specifies which font to use. Font names with spaces should be in quotes. 
                            You can list multiple fonts for fallback, ending with a generic family.
                        </p>

                        <p>CSS supports several generic font families:</p>

                        <ul>
                            <li>serif</li>
                            <li>sans-serif</li>
                            <li>monospace</li>
                            <li>cursive</li>
                            <li>fantasy</li>
                        </ul>
<ExampleCode> 
{`p {
    font-family: "Trebuchet MS", sans-serif;
 }

 h3 {
    font-family: Georgia, serif;
 }`}
</ExampleCode>

                        <h4>Popular Web-Safe Fonts</h4>
                        <ul>
                            <li>Arial (sans-serif)</li>
                            <li>Verdana (sans-serif)</li>
                            <li>Helvetica (sans-serif)</li>
                            <li>Tahoma (sans-serif)</li>
                            <li>Trebuchet MS (sans-serif)</li>
                            <li>Times New Roman (serif)</li>
                            <li>Georgia (serif)</li>
                            <li>Garamond (serif)</li>
                            <li>Courier New (monospace)</li>
                            <li>Brush Script MT (cursive)</li>
                        </ul>

                        <h3>font-style</h3>
                        <p>Sets the text style. Common values include: <code className="code">normal</code>, <code className="code">italic</code>, and <code className="code">oblique</code>.</p>
<ExampleCode> 
{`span {
    font-style: italic;
 }`}
</ExampleCode>

                        <h3>font-weight</h3>
                        <p>Defines the thickness of the text. Values: <code className="code">normal</code>, <code className="code">bold</code>.</p>
<ExampleCode> 
{`span {
    font-weight: bold;
 }`}
</ExampleCode>

                        <h3>font-variant</h3>
                        <p>Displays text in small capital letters. Values: <code className="code">normal</code>, <code className="code">small-caps</code>.</p>
<ExampleCode> 
{`p {
    font-variant: small-caps;
 }`}
</ExampleCode>

                        <h3>font-size</h3>
                        <p>Sets the size of the text. Units can be <code className="code">px</code>, <code className="code">em</code>, <code className="code">rem</code>, etc.</p>
<ExampleCode> 
{`p {
    font-size: 18px;
 }`}
</ExampleCode>



    <VideoBox 
        title='Text formatting 1'
        code='gcOIt1TauQU?si=4rdE8J5hqV6ur7VO'
    />

    <VideoBox 
        title='Text formatting 2'
        code='193dbd00vA0?si=BZiL1yipahI_V920'
    />



                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_width" 
                nextPath="/css_links"
            />
        </section>
    );
}
