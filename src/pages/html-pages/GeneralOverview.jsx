import '../../assets/styles/course-content.css';
import PrevNextBtn from '../../components/common/PrevNextBtn';

export default function GeneralOverview() {

    return (
        <section className="course-content">
            <div className="course-content__header">
                <h1>General Overview</h1>
                <p>Introduction</p>
            </div>

            <section>
                <div className="course-content__container">
                    <h3 className="bold">Welcome to this life-changing journey of empowerment and growth.</h3>

                       <p>
                        By choosing to be part of this rigorous yet rewarding learning experience, 
                        you’ve taken a bold step toward preparing yourself for real-world success in the tech industry.
                       </p>

                        <p>
                        Let’s begin with this introductory section — it’s packed with essential onboarding details 
                        and a clear overview of what’s ahead.
                       </p>

                       <h3 className="bold">
                        Are you ready to supercharge your growth and transform your path as a rising tech 
                        professional? We are—and we can’t wait to get started with you. Let’s go!
                       </h3>

                       <p>
                        It’s often said that you don’t truly understand something until you can teach it 
                        to someone else. But I believe the real test of understanding is being able to teach it to a computer.
                       </p>

                       <p> 
                        <b>So, how exactly do you teach something to a computer?</b>
                        <i>How do you command a machine and feel that thrill when it obeys?</i>
                       </p>

                        <p>
                            Well, keep in mind—your computer doesn’t speak your native language.
                            It doesn’t understand English, French, or any human language.
                        </p>

                        <h3 className="bold">What the computer understand is <i> the programming languages.</i></h3>

                        <p className="definition">
                            <i><b>What is Computer Programming?</b></i>
                            At its core, computer programming is the process of writing a 
                            set of instructions that a computer can understand and execute.
                        </p>

                        <p>With computer programs, you can:</p>

                        <ul className="lists">
                            <li>Develop solutions that help cure diseases</li>
                            <li>Build self-driving cars</li>
                            <li>Create immersive video games</li>
                            <li>Produce animated movies and graphics</li>
                            <li>Design powerful websites and mobile apps</li>
                            <li>And so much more</li>
                        </ul>
                            
                        <h3 className="bold">
                        In essence, programming is the language of creation in the 
                        digital world—and you're about to learn how to speak it.
                       </h3>
                </div>
            </section>

            <PrevNextBtn 
                prevPath="/welcome" 
                nextPath="/why"
            />
        </section>
    );
}
