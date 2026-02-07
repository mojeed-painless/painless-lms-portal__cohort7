import { useState } from 'react';
import AssignmentBox from '../../components/common/AssignmentBox';
import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import TakeQuizButton from '../../components/common/TakeQuizButton';
import TopicQuiz from '../../components/common/TopicQuiz';

export default function Images() {

  const [isQuizActive, setIsQuizActive] = useState(false);

  return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>HTML Images</h1>
                <p>Hypertext Markup Language</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>The <code>&lt;img&gt;</code> tag is used when you want to display images in an HTML page. It is a <strong>self-closing tag</strong>, meaning it does not need a closing tag like <code>&lt;/img&gt;</code>.</p>

  <h3>Basic Syntax</h3>
  <p>
    The most important attribute is <code>src</code>, which stands for "source". It tells the browser where to find the image.
  </p>

<ExampleCode>
{`<img src="./img/car.png">`}
</ExampleCode>

  <p>
    This will display an image located in the <code>img</code> folder of your project directory.
  </p>




  <h3>Setting Image Size with style</h3>
  <p>
    You can style the image using the <code>style</code> attribute to control the <code>width</code> and <code>height</code>.
  </p>

<ExampleCode>
{`<img src="./img/car.png" style="width:120px; height:56px;">`}
</ExampleCode>




  <h3>Alternatively: Use Width and Height Attributes</h3>
  <p>
    Instead of using <code>style</code>, you can directly use the <code>width</code> and <code>height</code> attributes:
  </p>

<ExampleCode>
{`<img src="./img/car.png" width="120" height="56">`}
</ExampleCode>




  <p>⚠️ Always ensure your image path is correct. If you're using an external image, you can provide a full URL:</p>
<ExampleCode>
{`<img src="https://example.com/image.jpg" width="300">`}
</ExampleCode>



    <VideoBox 
        title='Adding images to a webpage'
        code='_NyXgwpnzSA?si=Dk2dqegub-O8IzHj'
    />

 <h3>Smart Phone</h3>
    <VideoBox 
        title='Adding images to a webpage'
        code=''
    />
{/* <div className="watch">
    <p>🎥 Watch: Adding images to a webpage</p>
    <div className="video-responsive">
    <video controls>
      <source src="../../video/Phone_Images.mp4" type="video/mp4">
    </video>
    </div>
</div> */}


                    <AssignmentBox title="HTML Image Tag">
                        <ol>
                            <li>Create a new html file and name it <i>"my_image_work"</i></li>
                            <li>Inside the single file, do the following;</li>
                            <li>Add 3 different images to your website</li>
                            <li>Use the <code>style</code> attribute to set the width(200px) and height of each image</li>
                            <li>Ensure the images are displayed correctly on your webpage</li>
                        </ol>
                    </AssignmentBox>


                </div>
            </section>

            <TakeQuizButton onSelect={() => setIsQuizActive(prev => !prev)} />

            <article className={`topic-quiz__container ${isQuizActive ? 'active-quiz' : ''}`}>
              <TopicQuiz 
                onSelect={() => setIsQuizActive(prev => !prev)} 
                currentCategory="html" 
                currentTopic="HTML Images" 
              />
            </article>

            <PrevNextBtn 
                prevPath="/html-table" 
                nextPath="/html-hyperlinks"
            />
        </section>
    );
}
