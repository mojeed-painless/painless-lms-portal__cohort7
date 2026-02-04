import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function Variables() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Variables</h1>
                <p>Javascript</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Variables (part 1)'
                            code='3vT4s0_NYN4?si=06_ORHlSBgG_0GDM'
                        />

                        <VideoBox 
                            title='Variables (part 2)'
                            code='Wn61QCYudkg?si=j2eQ-ugnUBfGVTvK'
                        />
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/js-statements" 
                nextPath="/js-naming-variables"
            />
        </section>
    );
}
