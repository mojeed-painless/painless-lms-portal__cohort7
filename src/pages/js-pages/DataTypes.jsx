import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function DataTypes() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Data Types</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Data Types'
                            code='ibTmM6Hk2iE?si=a5RYGLWE3uw9oI4Z'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-constant" 
                nextPath="/js-strings"
            />
        </section>
    );
}
