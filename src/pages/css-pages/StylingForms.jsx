import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function StylingForms() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Styling Forms</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">

                        <VideoBox 
                            title='Styling Form 1'
                            code='K25oSwO4O1M?si=q1FoChntS1Vh26N0'
                        />

                        <VideoBox 
                            title='Styling Form 2'
                            code='AApJAGaHohY?si=Rx3Xghc9miCfakQr'
                        />

                        <VideoBox 
                            title='Styling Form 3'
                            code='mQ8hb18_9ZA?si=Cbh9DKhsB3GgEj5S'
                        />

                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Styling Forms" />
            <PrevNextBtn 
                prevPath="/css_mediaquery" 
                nextPath="/css_navbar"
            />
        </section>
    );
}
