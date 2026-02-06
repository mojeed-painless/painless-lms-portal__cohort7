import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import AssignmentBox from '../../components/common/AssignmentBox';

export default function AssignmentGuide() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Assignment Guide</h1>
                <p>Introduction</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                    <h3 className="bold">Before we proceed, watch this video to learn how to properly submit your assignments through the portal</h3>


                        <VideoBox 
                            title='How to Submit Assignments on the Painless LMS Portal'
                            code='p_z25a0R2eE?si=W_oAkXut_sMR6FwB'
                        />


                    <AssignmentBox title="My first project">
                        <ol>
                            <li>Create a file and name it exactly <i>"my_first_project"</i></li>
                            <li>Write the following lines of sentences;</li>
                            <li><i>"Hello world!"</i></li>
                            <li><i>"My name is (your name here)"</i></li>
                            <li><i>"I can't wait to learn more about Web Development"</i></li>
                            <li>Run it and make sure it displays on the browser</li>
                        </ol>
                    </AssignmentBox>


                
                </div>
            </section>



                        <PrevNextBtn 
                                prevPath="/course-overview" 
                                nextPath="/html-transition"
                        />
        </section>
    );
}
