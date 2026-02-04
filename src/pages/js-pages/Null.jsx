import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Null() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Null</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Null'
                            code='2a7Rq6dYacM?si=CwWPLu89W-PhEEjQ'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-boolean" 
                nextPath="/js-typeOf"
            />
        </section>
    );
}
