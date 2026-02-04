import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function CodeEditors() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Code Editors</h1>
                <p>Introduction</p>
            </div>

            <section>
                <div className="course-content__container">
                     <p>
                            To write code, you need a <strong>code editor</strong>—a specialized tool designed to help you 
                            write, edit, and manage code efficiently.
                        </p>

                        <h3 className="bold">Here are some of the most commonly used editors:</h3>

                        <ul>
                            <li><strong>Notepad++:</strong> Lightweight and simple, best for quick HTML or script edits.</li>
                            <li><strong>Sublime Text:</strong> Fast and powerful, known for multi-cursor editing and speed.</li>
                            <li><strong>Atom:</strong> Open-source with a friendly UI, but now deprecated.</li>
                            <li><strong>Brackets:</strong> Designed for front-end development with live preview, but less popular now.</li>
                            <li><strong>Visual Studio Code (VS Code):</strong> The most widely used editor today, offering advanced features and tools.</li>
                        </ul>

                        
                        <h3 className="bold">
                            In this course, <strong>we’ll be using Visual Studio Code (VS Code)</strong> as our 
                            official code editor.
                        </h3>

                        <p>Here’s why it’s our top choice:</p>

                        <ul>
                            <li><strong>Beginner-Friendly:</strong> Simple layout, intuitive interface</li>
                            <li><strong>Powerful Extensions:</strong> Easily add support for HTML, CSS, JS, and more</li>
                            <li><strong>Built-in Terminal:</strong> Run commands right inside the editor</li>
                            <li><strong>IntelliSense:</strong> Auto-complete, error detection, and code suggestions</li>
                            <li><strong>Live Server:</strong> Real-time preview of your webpage as you code</li>
                            <li><strong>Cross-platform:</strong> Works on Windows, Mac, and Linux</li>
                            <li><strong>Customizable:</strong> Themes, shortcuts, layout, and more</li>
                        </ul>

                        <h3 className="bold">
                            Whether you're just starting or aiming to become a professional developer, VS Code gives you 
                            the environment you need to grow.
                        </h3>

                        <hr />


                        <h3 className="bold">🚀 Let’s Get Started with VS Code!</h3>
                        
                        <VideoBox 
                            title='How to Set Up VS Code'
                            code='p_z25a0R2eE?si=W_oAkXut_sMR6FwB'
                        />

                        <a href="https://code.visualstudio.com/download" target="_blank" className="visit_link">Visit VS Code</a>

                        <h3>For smart phone users</h3>
                        <p> If you're using a smartphone, you can still code using TREBEDIT app. It's available on playstore. 
                            Click the link below to download it
                        </p>
                        <a href="https://play.google.com/store/apps/details?id=com.teejay.trebedit" target="_blank" className="visit_link">Download TREBEDIT</a>
                        
                        <VideoBox 
                            title='Using TREBEDIT'
                            code='cEV5pJGoxx8?si=ey2OTg8SllTl8vQ8'
                        />

                        <VideoBox 
                            title='Create your first project'
                            code='K0WakmFNOb8?si=xyUQPBl7eqTYBKS4'
                        />

                        <hr />

                        <h3 className="bold">Finally, There Are Online Code Editors Too!</h3>

                        <p>
                            These are editors that doesn't require the installation of any Software. 
                            Maybe you're on a public computer or using a mobile device, they are readily available.
                        </p>

                        <ul>
                            <li>
                            <strong>CodePen</strong> – Live HTML/CSS/JS playground. Great for front-end designs.
                            <br /><a href="https://codepen.io" target="_blank" className="visit_link">Visit CodePen</a>
                            </li>
                            
                            <li>
                            <strong>PlayCode</strong> – Fast and easy JavaScript playground.
                            <br /><a href="https://playcode.io" target="_blank" className="visit_link">Visit PlayCode</a>
                            </li>
                        </ul>

                        <p style={{marginTop: '1rem',}}>
                            Feel free to explore these platforms.  
                            But for this course, we’ll stick with <strong>VS Code</strong> to give you the best developer experience.
                        </p>



<hr />




                        <h3 className="bold">Additional Resourses (OPTIONAL)</h3>
                        <ul>
                            <li>
                            The ULTIMATE VS Code Setup - Extensions & Settings 2025
                            <br /><a href="https://youtu.be/lxRAj1Gijic" target="_blank" className="visit_link">Watch</a>
                            </li>
                        </ul>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/course-overview" 
                nextPath="/html-transition"
            />
        </section>
    );
}
