import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Numbers() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Numbers</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Numbers'
                            code='MiLo1X5HuSw?si=wzbekSp1V-YcGVYl'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-strings" 
                nextPath="/js-bigInt"
            />
        </section>
    );
}
