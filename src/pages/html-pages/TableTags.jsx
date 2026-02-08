import { useState } from 'react';
import AssignmentBox from '../../components/common/AssignmentBox';
import ExampleCode from '../../components/common/ExampleCode';
import CodeBox from '../../components/common/CodeBox';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';
import tableOutput1 from '../../assets/table1.png';
import tableOutput2 from '../../assets/table2.png'

export default function TableTags() {

  const [isQuizActive, setIsQuizActive] = useState(false);

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>HTML Tables</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            Tables in HTML are used to organize data into <strong>rows</strong> and <strong>columns</strong>, just like a spreadsheet. They are especially helpful for displaying tabular information like schedules, reports, and product data.
                       </p>

  <h3>Basic Structure</h3>
  <p>Here's the minimum structure of a table:</p>

  <p>Click <i><b>"Run code"</b></i> to display output</p>

<CodeBox
    lang='HTML'
    outputImg={tableOutput1}
>
<ExampleCode>
{`<table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
 </table>`}
</ExampleCode>
</CodeBox>


  <h3>Table Tags Explained</h3>
  <ul>
    <li><strong>&lt;table&gt;</strong> – wraps all your rows and cells</li>
    <li><strong>&lt;tr&gt;</strong> – defines a single row</li>
    <li><strong>&lt;th&gt;</strong> – creates a header cell, bold and centered by default</li>
    <li><strong>&lt;td&gt;</strong> – creates a standard data cell</li>
  </ul>

<hr />

<p>It obvious that the output of the table code above doesn't really look much like a table. This requires us
    to add some borders to make it look more structured like a table.
</p>

  <h3>Adding Borders</h3>
  <p>
    To quickly apply borders, you can add <code className="code">border="1"</code> to your <code className="code">&lt;table&gt;</code> tag like this:
  </p>

  <p>Click <i><b>"Run code"</b></i> to display output</p>

<CodeBox
    lang='HTML'
    outputImg={tableOutput2}
>
<ExampleCode>
{`<table border="1">
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
 </table>`}
</ExampleCode>
</CodeBox>

    <p>
        This adds a simple border around each cell, making it look more like a traditional table. 
        <i><b>Still doesn't look cool? Don't worry you can use CSS to style it further.</b></i>       
    </p>


  <h3>Summary</h3>
  <p>
    HTML tables are easy to understand and use. As you advance, you’ll learn to use CSS for improved layout, color, and responsiveness. 
  </p>

  <h3 className="bold">But even as a beginner, tables give you a powerful way to display and structure information neatly on your webpage.</h3>

    <VideoBox 
        title='HTML Table tags'
        code='YCHdWQpRtfI?si=ZL5k2r8eXdeNhqxO'
    />

    


                      <AssignmentBox title="HTML Table Tags">
                          <ol>
                            <li>Create a new html file and name it <i>"my_table_work"</i></li>
                            <li>Inside it, create a table that displays the following information:</li>
                            <ul>
                              <li>3 students' names</li>
                              <li>Their respective scores in Math, English, and Science</li>
                              <li>Add a border around the table</li>
                            </ul>
                          </ol>
                      </AssignmentBox>




                </div>
            </section>

            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory="html" 
                currentTopic="HTML Tables" 
              />
            </article>

            <PrevNextBtn 
                prevPath="/html-list" 
                nextPath="/html-image"
            />
        </section>
    );
}
