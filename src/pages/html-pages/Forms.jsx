import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';

export default function Forms() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Forms, Types & Fields</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
    Forms are essential for gathering input from users on a website. They can range from simple contact forms to complex data entry systems.
    All form elements are wrapped in the <code>&lt;form&gt;</code> tag.
</p>

  <h3>Basic Form Structure</h3>

  <p>
    Traditionally, the <code>&lt;label&gt;</code> tag is used to indicate the purpose of a form field. However, in modern design, the <code>placeholder</code> attribute is often preferred for a cleaner look.
  </p>

<ExampleCode>
{`<form>
    <input type="text" placeholder="Enter your name">
    <input type="submit" value="Submit">
 </form>`}
</ExampleCode>

  <h3>Common Input Types</h3>

  <ul>
    <li><code>&lt;input type="text"&gt;</code> – For single-line text input</li>
    <li><code>&lt;input type="password"&gt;</code> – For entering passwords (hidden characters)</li>
    <li><code>&lt;input type="submit"&gt;</code> – For submitting form data</li>
    <li><code>&lt;input type="radio"&gt;</code> – For selecting only one option from a group</li>
    <li><code>&lt;input type="checkbox"&gt;</code> – For selecting one or more options</li>
    <li><code>&lt;input type="email"&gt;</code> – For validating email input</li>
    <li><code>&lt;input type="date"&gt;</code> – For picking a calendar date</li>
    <li><code>&lt;input type="color"&gt;</code> – For picking a color</li>
  </ul>

  <h3>Radio Buttons Note</h3>
  <p>
    To ensure only one radio button can be selected, all radio inputs in the group must share the same <code>name</code> attribute.
  </p>

<ExampleCode>
{`<input type="radio" name="gender" value="male"> Male
 <input type="radio" name="gender" value="female"> Female`}
</ExampleCode>

  <h3>Checkboxes</h3>
  <p>
    Checkboxes allow users to select zero, one, or multiple options independently.
  </p>

<ExampleCode>
{`<input type="checkbox" name="skill" value="html"> HTML
 <input type="checkbox" name="skill" value="css"> CSS`}
</ExampleCode>

  <h3>Dropdown Menus (&lt;select&gt;)</h3>
  <p>
    The <code>&lt;select&gt;</code> tag creates a dropdown list. It uses <code>&lt;option&gt;</code> tags inside.
  </p>

<ExampleCode>
{`<select name="country">
    <option value="nigeria">Nigeria</option>
    <option value="ghana">Ghana</option>
 </select>`}
</ExampleCode>

  <p>To allow multiple selections:</p>

<ExampleCode>
{`<select name="languages" multiple>
    <option value="english">English</option>
    <option value="french">French</option>
 </select>`}
</ExampleCode>

  <h3>Textarea</h3>
  <p>
    The <code>&lt;textarea&gt;</code> tag is used for multi-line input. The <code>rows</code> and <code>cols</code> attributes control its size.
  </p>

<ExampleCode>
{`<textarea rows="4" cols="50" placeholder="Write your message here..."></textarea>`}
</ExampleCode>

    <VideoBox 
        title='Form1'
        code='yjBWtIZwuDs?si=8IspP7N-uYHIuY6m'
    />

    <VideoBox 
        title='Form2'
        code='xh4QxtVXLis?si=Cgr5v4JL45rGcHIa'
    />

    <VideoBox 
        title='Form3'
        code='Q2QTqGwTo-Q?si=ZcPPMq8c8gA_qosO'
    />
                </div>
            </section>

            <TakeQuizButton topicId="html-form" />

            <PrevNextBtn 
                prevPath="/html-block-element" 
                nextPath="/html-style"
            />
        </section>
    );
}
