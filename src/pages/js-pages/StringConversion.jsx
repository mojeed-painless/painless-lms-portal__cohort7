import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function StringConversion() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>String Conversion</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='String Conversion'
                            code='h41KBQeYZv0?si=b1x3ZpPb8h8E0aLK'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-browser-user-interaction" 
                nextPath="/js-number-conversion"
            />
        </section>
    );
}
