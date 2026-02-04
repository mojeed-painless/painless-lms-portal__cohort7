import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function CSSIntroduction() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Introduction to CSS</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            Once you've built your HTML structure, the next step is to bring it to life visually. This is where CSS (Cascading Style Sheets) comes in.
                            While we've briefly used inline styles within our HTML tags earlier in the course, a better and more professional approach is to separate style from content entirely.
                        </p>

                        <h3>Why Use CSS?</h3>

                        <p>
                            Originally, HTML was designed solely to structure and describe the content of a webpage. It wasn’t created for visual design.
                            However, as web development evolved, there was a need to control fonts, colors, spacing, and layout — which led to temporary solutions like the <code>&lt;font&gt;</code> tag and <code>color</code> attributes in HTML 3.2.
                        </p>

                        <p>
                            Imagine building a large website where you have to apply font and color changes to every tag on every page manually — this would be repetitive and very time-consuming.
                        </p>

                        <h3>A Better Solution</h3>

                        <p>
                            To solve this problem, the <strong>World Wide Web Consortium (W3C)</strong> introduced CSS. It allows developers to manage all styling rules from one central location, keeping HTML clean and easy to read.
                        </p>

                        <h3 className="bold">
                            With CSS, you can change the look and feel of an entire website by editing just a single CSS file. This makes maintenance easier, improves code readability, and supports responsive design.
                        </h3>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css-transition" 
                nextPath="/css_insert"
            />
        </section>
    );
}
