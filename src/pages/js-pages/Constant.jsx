import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Constant() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Constant</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Constant'
                            code='b1Xx4Thy_ns?si=fFb_a3HwkltyWNAd'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-naming-variables" 
                nextPath="/js-data-types"
            />
        </section>
    );
}
