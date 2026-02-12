import ExampleCode from '../../components/common/ExampleCode';
import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';
import VideoBox from '../../components/common/VideoBox';
import QuizBox from '../../components/common/QuizBox';

export default function NavigationBar() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>Navigation Bar</h1>
                <p>Cascading Style Sheets</p>
            </div>

            <section>
                <div className="course-content__container">
                    
                        <VideoBox 
                            title='Navbar 1'
                            code='TOrVz8KVfro?si=G7wv3KB9edk1qp5U'
                        />
                    
                        <VideoBox 
                            title='Navbar 2'
                            code='SYjpaxnXKfM?si=4xEjBW5anZBbhrqi'
                        />

                        <VideoBox 
                            title='Navbar 3'
                            code='5pziYKADUys?si=7sVe1bb4NAI385zv'
                        />
                </div>
            </section>

            <QuizBox currentCategory="css1" currentTopic="Navigation Bar" />
            <PrevNextBtn 
                prevPath="/css_form" 
                nextPath="/css_portfolio"
            />
        </section>
    );
}
