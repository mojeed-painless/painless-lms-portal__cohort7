import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function NumberConversion() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Number Conversion</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Number Conversion'
                            code='qzifWe0gesU?si=Dau0k1RipnKPidnJ'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-string-conversion" 
                nextPath="/js-boolean-conversion"
            />
        </section>
    );
}
