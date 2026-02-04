import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Boolean() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Boolean</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Boolean'
                            code='-3wfZwLG0Tc?si=igWQDUBmjmJnyZHv'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-bigInt" 
                nextPath="/js-null"
            />
        </section>
    );
}
