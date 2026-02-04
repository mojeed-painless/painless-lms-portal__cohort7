import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function BigInt() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>BigInt</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='BigInt'
                            code=''
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-numbers" 
                nextPath="/js-boolean"
            />
        </section>
    );
}
