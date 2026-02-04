import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Statements() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Statements</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Statements'
                            code='lKa3HD-3k6E?si=VRiu7HiIFPC3tCMJ'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-alert" 
                nextPath="/js-variables"
            />
        </section>
    );
}
