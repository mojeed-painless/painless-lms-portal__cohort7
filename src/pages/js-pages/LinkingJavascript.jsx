import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function LinkingJavascript() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Linking Javascript</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Linking Javascript'
                            code='SO-tf5ydrf8?si=FnZWFmkfCvZLNGEl'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-intro" 
                nextPath="/js-alert"
            />
        </section>
    );
}