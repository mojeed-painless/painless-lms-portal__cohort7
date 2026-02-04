import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function NamingVariables() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Naming Variables</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Naming Variables'
                            code='ACUc8hDiwNU?si=USZNrsWjezeLYn7X'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-variables" 
                nextPath="/js-constant"
            />
        </section>
    );
}
