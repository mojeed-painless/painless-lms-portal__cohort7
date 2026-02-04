import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';

export default function PortfolioProject() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Portfolio Project</h1>
                <p>Project</p>
            </div>

            <section>
                <div className="course-content__container">

                    <VideoBox 
                        title='PROJECT 01'
                        code='gbmryrVg32c?si=YW8By3mxQEkFsT-E'
                    />

                    <VideoBox 
                        title='PROJECT 02: HERO SECTION 01'
                        code='LUyo0f0LgYk?si=86TRUvKwTrVicNrt'
                    />

                    <VideoBox 
                        title='PROJECT 03: HERO SECTION 02'
                        code='prGlvAiCoE8?si=EOVsF2H-IlkOohd4'
                    />

                    <VideoBox 
                        title='PROJECT 04: ABOUT SECTION'
                        code='5DKvAYLjK00?si=Pt8sjvMDedkBJ7ej'
                    />

                    <VideoBox 
                        title='PROJECT 05: PORTFOLIO SECTION 01'
                        code='U4lsgPN7UPo?si=DLJXx1UzXq8P4blz'
                    />

                </div>
            </section>

            <PrevNextBtn 
                prevPath="/css_navbar" 
                nextPath="/js-transition"
            />
        </section>
    );
}
