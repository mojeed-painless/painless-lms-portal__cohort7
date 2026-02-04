import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function TypeOf() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>TypeOf</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='TypeOf'
                            code='EBaIk2Wz7is?si=jEv3xRbrta6N92H1'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-null" 
                nextPath="/js-browser-user-interaction"
            />
        </section>
    );
}
