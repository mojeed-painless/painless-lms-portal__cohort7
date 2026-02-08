import { useState } from 'react';
import AssignmentBox from '../../components/common/AssignmentBox';
import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function Hyperlinks() {

  const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>HTML Hyperlinks</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
    Adding hyperlinks to your HTML code adds functionality and navigation to your webpage.
    Hyperlinks allow users to move from one page to another within your website or to external sites on the internet.
</p>

  <h3>Syntax</h3>

<ExampleCode>
{`<a href="https://www.example.com">Click here</a>`}
</ExampleCode>

  <p>
    The <code className="code">&lt;a&gt;</code> tag is the anchor tag that defines a hyperlink.
    The <code className="code">href</code> attribute specifies the destination (URL) the link points to.
    The text between the opening and closing anchor tags is what the user sees and clicks.
  </p>

  <h3>Example</h3>

<ExampleCode>
{`<a href="https://www.facebook.com">Visit Facebook</a>`}
</ExampleCode>

  <p>
    Clicking this will take the user to Facebook.
  </p>

  <h3>The target Attribute</h3>

  <p>
    By default, links open in the same browser tab. But you can control this using the <code className="code">target</code> attribute:
  </p>

  <ul>
    <li><code className="code">_self</code> – Opens the link in the same tab (default behavior)</li>
    <li><code className="code">_blank</code> – Opens the link in a new tab</li>
  </ul>

  <p>
    To open a link in a new tab while keeping your website open, use:
  </p>

<ExampleCode>
{`<a href="https://www.twitter.com" target="_blank">Follow us on Twitter</a>`}
</ExampleCode>

<p>
    The <code className="code">_blank</code> is useful because we want to keep users within our webpage and 
    we don't want them going off by clicking the hyperlink.
</p>

    <VideoBox 
        title='Hyperlinks in action'
        code='VAwnxU9RtvY?si=tWBf36oNXac5CNQf'
    />




    <AssignmentBox title="HTML Hyperlinks Assignment">
      <ol>
        <li>Create a new html file and name it <i>"my_hyperlink_work"</i></li>
        <li>Inside the single file, do the following;</li>
        <li>Create an hyperlink to a website of your choice</li>
        <li>Use the <code className="code">target</code> attribute to open the link in a new tab</li>
        <li>Ensure the hyperlink is displayed correctly on your webpage</li>
      </ol>
    </AssignmentBox>

                </div>
            </section>

            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory="html" 
                currentTopic="HTML Hyperlinks" 
              />
            </article>

            <PrevNextBtn 
                prevPath="/html-image" 
                nextPath="/html-block-element"
            />
        </section>
    );
}
