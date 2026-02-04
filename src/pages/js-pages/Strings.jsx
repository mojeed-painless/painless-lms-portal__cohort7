import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Strings() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Strings</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Strings'
                            code='yzI2RxHaPSQ?si=Uc4BWfgbPRTiaTm-'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-data-types" 
                nextPath="/js-numbers"
            />
        </section>
    );
}
