import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function CSSSyntax() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>CSS Syntax</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            Every CSS rule consists of two main parts: the <strong>selector</strong> and the <strong>declaration block</strong>.
                        </p>

                        <h3>Basic Syntax Structure</h3>

<ExampleCode> 
{`selector {
    property: value;
 }`}
</ExampleCode>

                        <p>
                            The <code>selector</code> points to the HTML element you want to style. For example, <code>div</code>, <code>p</code>, or <code>h1</code>.
                        </p>

                        <p>
                            The <code>property</code> is the style attribute you want to change, such as <code>color</code>, <code>font-size</code>, or <code>background</code>.
                        </p>

                        <p>
                            The <code>value</code> is what you want to assign to that property, such as <code>red</code>, <code>16px</code>, or <code>#333</code>.
                        </p>

                        <p>
                            A colon <code>:</code> is used to separate the property from its value. A semicolon <code>;</code> is used to separate multiple declarations inside the block.
                        </p>

                        <h4>Example</h4>

<ExampleCode> 
{`div {
    color: red;
    font-size: 18px;
    background-color: #f0f0f0;
 }`}
</ExampleCode>

                        <p>
                            In the example above:
                            <ul>
                            <li><strong>div</strong> is the selector</li>
                            <li><strong>color</strong>, <strong>font-size</strong>, and <strong>background-color</strong> are properties</li>
                            <li><strong>red</strong>, <strong>18px</strong>, and <strong>#f0f0f0</strong> are the values</li>
                            </ul>
                        </p>

                        <p>
                            The entire block of styles (inside the curly braces <code>{ }</code>) is known as the <strong>declaration block</strong>.
                        </p>

                        <h3>Styling Multiple Properties</h3>

                        <p>
                            You can add multiple style properties inside a single declaration block. Just make sure to end each line with a semicolon <code>;</code>:
                        </p>

<ExampleCode> 
{`p {
    color: blue;
    line-height: 1.5;
    text-align: justify;
 }`}
</ExampleCode>

    <VideoBox 
        title='Syntax'
        code='2Y9FJ68wWhuk?si=N7lp4UgQlShWtYKC'
    />
                    
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_insert" 
                nextPath="/css_selectors"
            />
        </section>
    );
}
