import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function BrowserUserInteraction() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Browser-User Interaction</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Browser-User Interaction'
                            code='PmbLj3ZV_pY?si=DOBRfMjGpfNyrzkP'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-typeOf" 
                nextPath="/js-string-conversion"
            />
        </section>
    );
}
