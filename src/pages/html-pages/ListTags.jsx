import { useState } from 'react';
import ExampleCode from '../../components/common/ExampleCode';
import CodeBox from '../../components/common/CodeBox';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import listOutput1 from '../../assets/list1.png'
import listOutput2 from '../../assets/list2.png'
import listOutput3 from '../../assets/list3.png'
import listOutput4 from '../../assets/list4.png'
import listOutput5 from '../../assets/list5.png'
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function ListTags() {

    const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>HTML List Tag</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            In HTML, lists are essential for organizing related items. Whether you're outlining steps, presenting features, or simply grouping content, the <strong>list tag</strong> gives your webpage a clean and structured look.
                        </p>

                        <p></p>

                        <p>
                            There are two main types of lists in HTML:
                        </p>

                        <h3>Ordered List – &lt;ol&gt;&lt;/ol&gt;</h3>
                        <p>
                            An ordered list is used when the <strong>order of items matters</strong>, like steps in a recipe or instructions in a process.
                        </p>

                        <h4>Syntax:</h4>

<p>Click <i><b>"Run code"</b></i> to display output</p>

<CodeBox
    lang='HTML'
    outputImg={listOutput1}
>
<ExampleCode>
{`<ol>
    <li>Item One</li>
    <li>Item Two</li>
    <li>Item Three</li>
 </ol>`}
</ExampleCode>
</CodeBox>

                        <p>
                            By default, an ordered list displays items with <strong>numbers (1, 2, 3...)</strong>, but you can change the numbering style using the <code>type</code> attribute.
                        </p>



                        <h4>Other List Types (Using type attribute):</h4>
                        <table>
                            <thead>
                            <tr>
                                <th>Type Value</th>
                                <th>Description</th>
                                <th>Example Markers</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td>1</td><td>Default (numeric)</td><td>1, 2, 3</td></tr>
                            <tr><td>A</td><td>Uppercase letters</td><td>A, B, C</td></tr>
                            <tr><td>a</td><td>Lowercase letters</td><td>a, b, c</td></tr>
                            <tr><td>I</td><td>Uppercase Roman numerals</td><td>I, II, III</td></tr>
                            <tr><td>i</td><td>Lowercase Roman numerals</td><td>i, ii, iii</td></tr>
                            </tbody>
                        </table>

  <h4>Example:</h4>

<p>Click <i><b>"Run code"</b></i> to display output</p>
<CodeBox
    lang='HTML'
    outputImg={listOutput2}
>
<ExampleCode>
{`<ol type="A">
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
 </ol>`}
</ExampleCode>
</CodeBox>

                        <h3>Unordered List – &lt;ul&gt;&lt;/ul&gt;</h3>
                        <p>
                            An unordered list is used when the <strong>order of items doesn’t matter</strong>, like a list of features or ingredients.
                        </p>
                        <p>
                            By default, items are marked with <strong>bullet points (•)</strong>, but this can be changed using CSS.
                        </p>

  <h4>Syntax:</h4>


<p>Click <i><b>"Run code"</b></i> to display output</p>
<CodeBox
    lang='HTML'
    outputImg={listOutput3}
>
<ExampleCode>
{`<ul>
    <li>Milk</li>
    <li>Bread</li>
    <li>Butter<</li>
 </ul>`}
</ExampleCode>
</CodeBox>

                        <h4>Changing Bullet Style with CSS:</h4>
                        <table>
                            <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td>disc</td><td>Default solid circle</td></tr>
                            <tr><td>circle</td><td>Hollow circle</td></tr>
                            <tr><td>square</td><td>Solid square</td></tr>
                            <tr><td>none</td><td>No bullet</td></tr>
                            </tbody>
                        </table>

  <h4>Example:</h4>

<p>Click <i><b>"Run code"</b></i> to display output</p>
<CodeBox
    lang='HTML'
    outputImg={listOutput4}
>
<ExampleCode>
{`<ul style="list-style-type: square;">
    <li>Red</li>
    <li>Green</li>
    <li>Blue</li>
 </ul>`}
</ExampleCode>
</CodeBox>

  <h3>Nesting Lists</h3>
  <p>
    You can also nest a list inside another list. This is useful when you want to break items into subcategories:
  </p>

<p>Click <i><b>"Run code"</b></i> to display output</p>
<CodeBox
    lang='HTML'
    outputImg={listOutput5}
>
<ExampleCode>
{`<ol>
    <li>Fruits
      <ul>
       <li>Apple</li>
        <li>Mango</li>
      </ul>
    </li>
    <li>Vegetables
      <ul>
        <li>Carrot</li>
        <li>Spinach</li>
      </ul>
    </li>
 </ol>`}
</ExampleCode>
</CodeBox>


  <h3 className="bold">
    Use &lt;ol&gt; when the order of the items matters, and &lt;ul&gt; when it doesn’t. You can customize the appearance using attributes in HTML or CSS, and even nest lists inside one another to create more detailed structures.
  </h3>

    <VideoBox 
        title='HTML List tags'
        code='ciYWhJmH71w?si=u2uG4Eopvr6a3O0E'
    />



  <hr />




<div className="exercise">
    
    <h3>Practice Exercise</h3>

    <p>Instructions:</p>

    <ol>
        <li>Create an unordered list of your 4 favorite fruits.</li>
        <li>Create an ordered list of 3 places you want to visit, using lowercase Roman numerals.</li>
        <li>Create a nested list of programming languages and their related frameworks.</li>
    </ol>
</div>
                </div>
            </section>


            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory="html" 
                currentTopic="Lists" 
              />
            </article>                                  

            <PrevNextBtn 
                prevPath="/html-structure" 
                nextPath="/html-table"
            />
        </section>
    );
}
