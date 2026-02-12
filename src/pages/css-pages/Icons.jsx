import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function Icons() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Icons</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    <p>
                            Icons can greatly enhance the look and usability of your web page. 
                            The simplest way to add icons is by using an icon library. 
                            Popular libraries include:
                        </p>
                        <ul>
                            <li><strong>Font Awesome</strong></li>
                            <li><strong>Bootstrap Icons</strong></li>
                            <li><strong>Google Material Icons</strong></li>
                        </ul>
                        <p>These libraries provide a wide range of icons that you can easily integrate 
                            into your HTML with library having its own unique style and approach of adding 
                            icons. 
                        </p>

                        <h3>Using Font Awesome Icons</h3>
                        <p>To use Font Awesome, include the CDN link in your <code className="code">&lt;head&gt;</code> section. Then, use the <code className="code">&lt;i&gt;</code> or <code className="code">&lt;span&gt;</code> tag with the appropriate class name.</p>
                        
                        <h4>Example:</h4>
<ExampleCode language="html"> 
{`<head>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
 </head>

 <body>
    <i class="fas fa-home"></i>
    <i class="fas fa-user"></i>
    <i class="fas fa-envelope"></i>
    <i class="fas fa-search"></i>
    <i class="fas fa-trash"></i>
 </body>`}
</ExampleCode>

                        <h4>Result:</h4>
                        <ul>
                            <li><i class="fas fa-home"></i> Home Icon</li>
                            <li><i class="fas fa-user"></i> User Icon</li>
                            <li><i class="fas fa-envelope"></i> Email Icon</li>
                            <li><i class="fas fa-search"></i> Search Icon</li>
                            <li><i class="fas fa-trash"></i> Trash Icon</li>
                        </ul>

                        <h3>2. Using Bootstrap Icons</h3>
                        <p>Include the Bootstrap Icons CDN in your <code className="code">&lt;head&gt;</code>, then use the <code className="code">&lt;i&gt;</code> or <code className="code">&lt;span&gt;</code> tag with <code className="code">bi</code> classes.</p>

                        <h4>Example:</h4>
<ExampleCode language="html"> 
{`<head>
    <!-- Bootstrap Icons CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
 </head>

 <body>
    <i class="bi bi-house-door"></i>
    <i class="bi bi-person"></i>
    <i class="bi bi-envelope"></i>
    <i class="bi bi-search"></i>
    <i class="bi bi-trash"></i>
 </body>`}
</ExampleCode>
  
                        <h4>Result:</h4>
                        <ul>
                            <li><i class="bi bi-house-door"></i> Home Icon</li>
                            <li><i class="bi bi-person"></i> Person Icon</li>
                            <li><i class="bi bi-envelope"></i> Envelope Icon</li>
                            <li><i class="bi bi-search"></i> Search Icon</li>
                            <li><i class="bi bi-trash"></i> Trash Icon</li>
                        </ul>

                        <h3>Using Google Material Icons</h3>
                        <p>For Material Icons, include the Google Fonts link in your <code className="code">&lt;head&gt;</code> and use the <code className="code">&lt;span&gt;</code> tag with the class <code className="code">material-icons</code>.</p>

                        <h4>Example:</h4>

<ExampleCode language="html"> 
{`<head>
    <!-- Google Material Icons CDN -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 </head>

 <body>
    <span class="material-icons">home</span>
    <span class="material-icons">person</span>
    <span class="material-icons">email</span>
    <span class="material-icons">search</span>
    <span class="material-icons">delete</span>
 </body>`}
</ExampleCode>
       
                        <h4>Result:</h4>
                        <ul>
                            <li><span class="material-icons">home</span> Home Icon</li>
                            <li><span class="material-icons">person</span> Person Icon</li>
                            <li><span class="material-icons">email</span> Email Icon</li>
                            <li><span class="material-icons">search</span> Search Icon</li>
                            <li><span class="material-icons">delete</span> Delete Icon</li>
                        </ul>

                        <h3>Conclusion</h3>
                        <p>CSS Icon libraries are very easy to use and help you quickly enhance your web interface with visually meaningful symbols. Choose any of the popular libraries and use their icons by simply applying the correct class names.</p>

    <VideoBox 
        title='Icons 1'
        code='CDygulvxwig?si=aTR0lbG1PIRLgRRE'
    />

    <VideoBox 
        title='Icons 2'
        code='XM076pYnFbg?si=tXnhxaNrHWIpfyPe'
    />

                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Icons" />
            <PrevNextBtn 
                prevPath="/css_table" 
                nextPath="/css_display"
            />
        </section>
    );
}
