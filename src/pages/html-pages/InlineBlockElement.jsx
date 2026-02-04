import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function InlineBlockElement() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Inline & Block Elements</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
    HTML elements are broadly categorized into two types based on how they behave in a web page layout: <strong>block-level elements</strong> and <strong>inline elements</strong>.
</p>

  <h3>Block Elements</h3>
  <p>
    A <strong>block-level element</strong> always starts on a new line and stretches out to the full width of the container (by default).
    The browser also typically adds space (margin) above and below these elements.
  </p>

  <p>Common examples of block elements include:</p>

<ExampleCode>
{`<div>, <p>, <h1> <h6>, <table>, <ol>, <ul>, <form>, <nav>, <header>, <footer>, <section>, <article>, <aside>`}
</ExampleCode>

  <h4>Example of a Block Element</h4>
<ExampleCode>
{`<div>
    <h2>Welcome to Web Development</h2>
    <p>This is a paragraph inside a div.</p>
 </div>`}
</ExampleCode>

  <h4>The &lt;div&gt; Element</h4>
  <p>
    The <code>&lt;div&gt;</code> tag is one of the most commonly used block-level elements. It acts as a container for other elements, helping structure your page and making it easier to apply CSS styling later.
  </p>

  <h3>Inline Elements</h3>
  <p>
    An <strong>inline element</strong> only takes up as much width as its content needs. It does not start on a new line, and no margin is added by default.
  </p>

  <p>Common examples of inline elements include:</p>

<ExampleCode>
{`<span>, <a>, <img>, <strong>, <em>, <i>, <b>, <br>, <small>, <sup>, <sub>, <select>, <textarea>, <button>`}
</ExampleCode>

  <h4>Example of an Inline Element</h4>
<ExampleCode>
{`<p>This is a <span>highlighted</span> word in a sentence.</p>`}
</ExampleCode>

  <h4> The &lt;span&gt; Element</h4>
  <p>
    The <code>&lt;span&gt;</code> tag is commonly used to style part of the text inside a block element. It's especially useful when combined with CSS.
  </p>

  <h4>Formatting with Inline Tags</h4>
  <p>
    You can format your content using inline tags like:
  </p>

  <ul>
    <li><code>&lt;b&gt;</code> or <code>&lt;strong&gt;</code> – bold text</li>
    <li><code>&lt;i&gt;</code> or <code>&lt;em&gt;</code> – italic text</li>
  </ul>

  <h3 className="bold">
    While these tags are helpful, modern development encourages using CSS for styling, as it improves readability and separates design from content.
  </h3>

    <VideoBox 
        title='Block vs Inline Elements'
        code='ygcHUmkOjcI?si=8Yfg6zsn113tE4M3'
    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/html-hyperlinks" 
                nextPath="/html-form"
            />
        </section>
    );
}
