import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function InsertingCSS() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Inserting CSS</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>
                            There are <strong>three main ways</strong> to apply CSS styles to your HTML content. Each serves different purposes depending on the scope, size, and reusability of the project.
                        </p>

                        <h3>1. External Styling</h3>
                        <p>
                            External CSS is the most common and scalable method. The styles are written in a separate file with a <code className="code">.css</code> extension. This makes it easy to apply consistent styles across multiple HTML pages and maintain your code more efficiently.
                        </p>
                        <p>To use external CSS, link the stylesheet in the <code className="code">&lt;head&gt;</code> section of your HTML page:</p>

<ExampleCode> 
{`<head>
    <link rel="stylesheet" href="styles.css">
 </head>`}
</ExampleCode>

                        <p><strong>Benefits:</strong> <em>Clean separation of structure and design, reusable styles, easier updates.</em></p>

                        <h3>2. Internal Styling</h3>
                        <p>
                            Internal CSS is used when a single HTML document needs its own unique styling. This CSS is placed within a <code className="code">&lt;style&gt;</code> tag in the <code className="code">&lt;head&gt;</code> section of the HTML file.
                        </p>

<ExampleCode> 
{`<head>
    <style>
        body {
            background-color: #f0f0f0;
        }

        h1 {
            color: #2980b9;
        }
    </style>
 </head>`}
</ExampleCode>

                        <p><strong>Use case:</strong> <em>Small projects or individual page tweaks where external files are unnecessary.</em></p>

                        <h3>3. Inline Styling</h3>
                        <p>
                            Inline CSS is applied directly inside an HTML tag using the <code className="code">style</code> attribute. This is best for quick testing or applying a one-time unique style to a single element.
                        </p>

<ExampleCode> 
{`<h1 style="color: green; font-size: 24px;"> Hello, styled world! </h1>`}
</ExampleCode>

                        <p><strong>Drawback:</strong> <em>Harder to maintain, can clutter your HTML, and not reusable across pages.</em></p>

                        <h3>Summary Table</h3>
                        <table border="1" cellpadding="8" cellspacing="0">
                            <tr>
                            <th>Method</th>
                            <th>Location</th>
                            <th>Best For</th>
                            </tr>
                            <tr>
                            <td>External</td>
                            <td>Separate .css file</td>
                            <td>Large/multi-page websites</td>
                            </tr>
                            <tr>
                            <td>Internal</td>
                            <td>Inside &lt;style&gt; tag</td>
                            <td>Unique styles for one page</td>
                            </tr>
                            <tr>
                            <td>Inline</td>
                            <td>Inside the HTML element</td>
                            <td>Quick, one-off styling</td>
                            </tr>
                        </table>

    <VideoBox 
        title='Inserting CSS'
        code='2pAKDXBIpYY?si=0CpJtDHTtbEgW_Ws'
    />
            

                        <hr />



                        
<div className="exercise">
    
    <h3>Practice Exercise</h3>

    <p>Instructions:</p>

    <ol>
        <li>Create a css file</li>
        <li>Link it correctly to your html file</li>
        <li>Test if it works and add a screenshot of the outcome in your submission folder</li>
    </ol>
</div>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_introduction" 
                nextPath="/css_syntax"
            />
        </section>
    );
}
