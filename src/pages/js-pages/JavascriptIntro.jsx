import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';

export default function JavascriptIntro() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Introduction to Javascript</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                        <p><strong>JavaScript</strong> is a powerful scripting language that 
                            allows web developers and designers to build <strong>dynamic</strong>, 
                            <strong>interactive</strong>, and <strong>responsive</strong> websites.
                        </p>
                        <p>From animations to real-time updates and form validations — 
                            <strong>JavaScript is everywhere</strong>. If you're viewing a modern webpage,
                             there's a high chance JavaScript is running behind the scenes!
                        </p>

                        <h3>Brief History</h3>
                        <div class="appear">
                            <p>JavaScript and Java are <strong>not the same</strong>.</p>
                            <p>When JavaScript was first created, it was called <strong>“LiveScript”</strong>. 
                                But at that time, Java was incredibly popular. To ride that wave of popularity, 
                                the creators renamed it <strong>JavaScript</strong>, hoping to present it as a 
                                “younger brother” of Java.
                            </p>
                            <p>However, as JavaScript matured, it evolved into a <strong>completely independent 
                                language</strong> with its own specification known as <strong>ECMAScript</strong>.
                            </p>
                            <p>Today, JavaScript has no technical connection to Java at all — they are two entirely 
                                different languages with different purposes and syntaxes.
                            </p>
                        </div>

                        <h3>What JavaScript Can Do</h3>
                        <div class="appear">
                            <ul>
                                <li>Modify or add HTML elements and styles on the fly.</li>
                                <li>React to user actions like clicks, typing, or mouse movements.</li>
                                <li>Communicate with web servers using AJAX or Fetch (send/receive data).</li>
                                <li>Show popups, collect user input, and manage cookies.</li>
                                <li>Save and retrieve data locally using LocalStorage and SessionStorage.</li>
                            </ul>
                        </div>

                        <h3>Why Learn JavaScript?</h3>
                        <div class="appear">
                            <ul>
                                <li>It runs in all modern browsers.</li>
                                <li>It’s essential for front-end development (alongside HTML & CSS).</li>
                                <li>It’s beginner-friendly and widely used across the web.</li>
                                <li>Learning JavaScript opens the door to jobs in web development.</li>
                            </ul>
                        </div>

                        <h3>What You’ll Learn</h3>
                        <div class="appear">
                            <p>In this course, you’ll learn how to write JavaScript code, 
                                understand the building blocks of the language, 
                                and use it to add interactivity to websites.
                            </p>
                        </div>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-transition" 
                nextPath="/js-linking"
            />
        </section>
    );
}
