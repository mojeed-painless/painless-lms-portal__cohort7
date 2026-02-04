import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function BooleanConversion() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Boolean Conversion</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Boolean Conversion'
                            code='fuMQUb5rec4?si=bxYXonvxxIEOS4Wo'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-number-conversion" 
                nextPath=""
            />
        </section>
    );
}
