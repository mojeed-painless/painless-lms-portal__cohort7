import radioImg from '../src/assets/radio.jpg'
import internalImg from '../src/assets/internalImg.png'
import borderImg from '../src/assets/borderImg.jpg'

export const DailyQuizData = [
    {
        day: 1,
        date: '02/06/2026',
        questions: [
            {
                id: 1,
                question: "What is HTML?",
                options: [
                    { id: 'A', text: "A markup language for creating web pages" },
                    { id: 'B', text: "A programming language for web development" },
                    { id: 'C', text: "A database management system" },
                    { id: 'D', text: "A web server software" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 2,
                question: "What does HTML stand for?",
                options: [
                    { id: 'A', text: "Hyperlinking Text Marking Language" },
                    { id: 'B', text: "Home Tool Markup Language" },
                    { id: 'C', text: "Hyperlinks and Text Markup Language" },
                    { id: 'D', text: "Hyper Text Markup Language" }
                ],
                correctAnswer: 'D',
            },
            {
                id: 3,
                question: "What is the full meaning of CSS?",
                options: [
                    { id: 'A', text: "Color Style Sheets" },
                    { id: 'B', text: "Cascading Style Sheets" },
                    { id: 'C', text: "Creative Style System" },
                    { id: 'D', text: "Computer Style Syntax" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "What is the primary function of JavaScript in a website?",
                options: [
                    { id: 'A', text: "To create the skeleton and structure of the page" },
                    { id: 'B', text: "To store the website's data in a database" },
                    { id: 'C', text: "To make the website interactive and responsive to user actions" },
                    { id: 'D', text: "To paint the car and add visual polish" }
                ],
                correctAnswer: 'C',
            },
        ],
    },
    {
        day: 2,
        date: '02/07/2026',
        questions: [
            {
                id: 1,
                question: "Which of the following is not a core element of a boilerplate?",
                options: [
                    { id: 'A', text: "<img>" },
                    { id: 'B', text: "<body>" },
                    { id: 'C', text: "<!DOCTYPE>" },
                    { id: 'D', text: "<meta>" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 2,
                question: "What attribute is used to change the list type of an ordered list?",
                options: [
                    { id: 'A', text: "style = \" \"" },
                    { id: 'B', text: "list-style-type: square" },
                    { id: 'C', text: "<li>list type</li>" },
                    { id: 'D', text: "type = \" \"" }
                ],
                correctAnswer: 'D',
            },
            {
                id: 3,
                question: "Which of the following tags is used to add rows in a table?",
                options: [
                    { id: 'A', text: "<row>" },
                    { id: 'B', text: "<tr>" },
                    { id: 'C', text: "<th>" },
                    { id: 'D', text: "<td>" }
                ],
                correctAnswer: 'B',
            }
        ],
    },
    {
        day: 3,
        date: '02/08/2026',
        questions: [
            {
                id: 1,
                question: "One of the anchor tag's (<a>) attributes is target. Which of its values opens a new browser tab whenever the link is clicked?",
                options: [
                    { id: 'A', text: "_blank" },
                    { id: 'B', text: "_parent" },
                    { id: 'C', text: "_self" },
                    { id: 'D', text: "_top" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 2,
                question: "Which of the following set of tags are all block elements?",
                options: [
                    { id: 'A', text: "<h6>, <span>, <p>" },
                    { id: 'B', text: "<div>, <b>, <img>" },
                    { id: 'C', text: "<span>, <em>, <a>" },
                    { id: 'D', text: "<ul>, <h5>, <div>" }
                ],
                correctAnswer: 'D',
            }
        ],
    },
    {
        day: 4,
        date: '02/10/2026',
        questions: [
            {
                id: 1,
                question: "The buttons X & Y below are called _____ and _____ respectively.",
                image: radioImg,
                options: [
                    { id: 'A', text: "checkbox and square button" },
                    { id: 'B', text: "radio and checkbox button" },
                    { id: 'C', text: "dot and square button" },
                    { id: 'D', text: "click and mark button" }
                ],
                correctAnswer: 'B',
            }
        ],
    },
    {
        day: 5,
        date: '02/12/2026',
        questions: [
            {
                id: 1,
                question: "What type of styling is shown below?",
                image: internalImg,
                options: [
                    { id: 'A', text: "Internal styling" },
                    { id: 'B', text: "Inline styling" },
                    { id: 'C', text: "General styling" },
                    { id: 'D', text: "External styling" }
                ],
                correctAnswer: 'A',
            }
        ],
    },
    {
        day: 6,
        date: '02/13/2026',
        questions: [
            {
                id: 1,
                question: "The characters * and # respectively used for _____ and _____ selectors in CSS",
                options: [
                    { id: 'A', text: "class & id" },
                    { id: 'B', text: "universal & id" },
                    { id: 'C', text: "id & elements" },
                    { id: 'D', text: "class & universal" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "RGBA is a numeric system of adding colors to your web page. The 'A' in the acronym stands for _____",
                options: [
                    { id: 'A', text: "all" },
                    { id: 'B', text: "attribute" },
                    { id: 'C', text: "anchor" },
                    { id: 'D', text: "alpha" }
                ],
                correctAnswer: 'D',
            },
            {
                id: 3,
                question: "The hexadecimal values below represents what colors respectively? '#00FF00', '#FF0000', '0000FF'",
                options: [
                    { id: 'A', text: "Blue, Red, Green" },
                    { id: 'B', text: "Red, Green, Blue" },
                    { id: 'C', text: "Green, Red, Blue" },
                    { id: 'D', text: "Red, Blue, green" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        day: 7,
        date: '02/14/2026',
        questions: [
            {
                id: 1,
                question: "The correct order for the border values below is _____",
                image: borderImg,
                options: [
                    { id: 'A', text: "top, right, bottom, left" },
                    { id: 'B', text: "bottom, left, top, right" },
                    { id: 'C', text: "right, bottom, left, top" },
                    { id: 'D', text: "left, bottom, right, top" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 2,
                question: "Which of the following is not a component of a box-model?",
                options: [
                    { id: 'A', text: "border" },
                    { id: 'B', text: "outline" },
                    { id: 'C', text: "margin" },
                    { id: 'D', text: "padding" }
                ],
                correctAnswer: 'B',
            }
        ],
    },
    {
        day: 8,
        date: '02/15/2026',
        questions: [
            {
                id: 1,
                question: "Which of the following text properties can be used to add a line under texts",
                options: [
                    { id: 'A', text: "text-align" },
                    { id: 'B', text: "text-transformation" },
                    { id: 'C', text: "text-decoration" },
                    { id: 'D', text: "text-spacing" }
                ],
                correctAnswer: 'C',
            },
        ],
    },
    {
        day: 9,
        date: '02/16/2026',
        questions: [
            {
                id: 1,
                question: "What is the name of the first programmer?",
                options: [
                    { id: 'A', text: "Ada Lovelace" },
                    { id: 'B', text: "Lord Byron" },
                    { id: 'C', text: "Bill Gate" },
                    { id: 'D', text: "Mark Zuckerberg" }
                ],
                correctAnswer: 'A',
            },
        ],
    },
    {
        day: 10,
        date: '02/17/2026',
        questions: [
            {
                id: 1,
                question: "What is the name of the first programmer?",
                options: [
                    { id: 'A', text: "Ada Lovelace" },
                    { id: 'B', text: "Lord Byron" },
                    { id: 'C', text: "Bill Gate" },
                    { id: 'D', text: "Mark Zuckerberg" }
                ],
                correctAnswer: 'A',
            },
        ],
    },
    {
        day: 11,
        date: '02/18/2026',
        questions: [
            {
                id: 1,
                question: "Which of the following is not a link state in CSS?",
                options: [
                    { id: 'A', text: ":hover" },
                    { id: 'B', text: ":focus" },
                    { id: 'C', text: ":visited" },
                    { id: 'D', text: ":link" }
                ],
                correctAnswer: 'B',
            },
        ],
    },
    {
        day: 12,
        date: '02/19/2026',
        questions: [
            {
                id: "12",
                question: "Which of the following property-value pairs below is used to remove double border from tables?",
                options: [
                    { id: 'A', text: "border: 1px solid black;" },
                    { id: 'B', text: "border-collapse: single;" },
                    { id: 'C', text: "border-collapse: collapse;" },
                    { id: 'D', text: "border: single-line;" }
                ],
                correctAnswer: 'C',
            },
        ],
    },
    {
        day: 13,
        date: '02/20/2026',
        questions: [
            {
                id: "13",
                question: "display: none removes both content and space while visibility: hidden removes just content but keeps the space.",
                options: [
                    { id: 'A', text: "maybe" },
                    { id: 'B', text: "false" },
                    { id: 'C', text: "I don't know" },
                    { id: 'D', text: "true" }
                ],
                correctAnswer: 'D',
            },
        ],
    },
    {
        day: 15,
        date: '02/21/2026',
        questions: [
            {
                id: 1,
                question: "What is the missing property in the syntax below [ _____: start / end; ]",
                options: [
                    { id: 'A', text: "grid-column" },
                    { id: 'B', text: "flex-box" },
                    { id: 'C', text: "align-items" },
                    { id: 'D', text: "justify-content" }
                ],
                correctAnswer: 'A',
            },
        ],
    },
    {
        day: 16,
        date: '02/22/2026',
        questions: [
            {
                id: "16",
                question: "Which of the following symbols is used for adjacent sibling selector",
                options: [
                    { id: 'A', text: "+" },
                    { id: 'B', text: "?" },
                    { id: 'C', text: "~" },
                    { id: 'D', text: ">" }
                ],
                correctAnswer: 'A',
            },
        ],
    },
    {
        day: 17,
        date: '02/23/2026',
        questions: [
            {
                id: "17",
                question: "Which of the following is the correct way of using attribute selectors?",
                options: [
                    { id: 'A', text: "element::attribute" },
                    { id: 'B', text: "element > attribute" },
                    { id: 'C', text: "element[attribute]" },
                    { id: 'D', text: "element + attribute" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        day: 6,
        date: '02/13/2026',
        questions: [
            
        ],
    },
    {
        day: 6,
        date: '02/13/2026',
        questions: [
            
        ],
    },
    {
        day: 6,
        date: '02/13/2026',
        questions: [
            
        ],
    },
    {
        day: 6,
        date: '02/13/2026',
        questions: [
            
        ],
    },
]



























export const TopicQuizData = [
    {
        topic: 'General Overview',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "According to what you just read, what is the 'real test' of understanding a concept?",
                options: [
                    { id: 'A', text: "Memorizing all technical terms" },
                    { id: 'B', text: "Being able to teach it to a computer" },
                    { id: 'C', text: "Being able to speak multiple native languages" },
                    { id: 'D', text: "Writing a long essay about the topic" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "Why can't you use your native language (like English or Yoruba) to command a computer?",
                options: [
                    { id: 'A', text: "Human languages are too fast for computers" },
                    { id: 'B', text: "Computers can only process animated graphics" },
                    { id: 'C', text: "Computers only understand programming languages" },
                    { id: 'D', text: "Native languages are only for mobile apps" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "What is the core definition of 'computer programming'?",
                options: [
                    { id: 'A', text: "The process of writing instructions that a computer can execute" },
                    { id: 'B', text: "The process of building physical hardware for cars" },
                    { id: 'C', text: "The study of how humans learn new tech skills" },
                    { id: 'D', text: "Translating English into French for the web" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 4,
                question: "Which of the following is NOT mentioned as something you can do with computer programs?",
                options: [
                    { id: 'A', text: "Develop solutions that help cure diseases" },
                    { id: 'B', text: "Build traditional brick-and-mortar houses" },
                    { id: 'C', text: "Create immersive video games" },
                    { id: 'D', text: "Design powerful websites and mobile apps" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 5,
                question: "In essence, programming is described as the ______ of creation in the digital world.",
                options: [
                    { id: 'A', text: "Manual" },
                    { id: 'B', text: "Hardware" },
                    { id: 'C', text: "Language" },
                    { id: 'D', text: "Difficulty" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'Why should I learn Coding',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "Why is coding more than just using drag-and-drop website builders?",
                options: [
                    { id: 'A', text: "Because drag-and-drop platforms are no longer useful" },
                    { id: 'B', text: "Because it helps you understand technology from the inside out" },
                    { id: 'C', text: "Because templates are too expensive to use" },
                    { id: 'D', text: "Because coding is only for building blogs" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "What specific benefit does Steve Jobs attribute to learning how to program?",
                options: [
                    { id: 'A', text: "It helps you earn a high salary" },
                    { id: 'B', text: "It makes you better at social media" },
                    { id: 'C', text: "It teaches you how to think in a certain way" },
                    { id: 'D', text: "It allows you to build iPhones" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "According to Bill Gates, what does understanding how a computer works give you a sense of?",
                options: [
                    { id: 'A', text: "How to fix broken hardware" },
                    { id: 'B', text: "What a computer can and cannot do" },
                    { id: 'C', text: "How to win board games like Monopoly" },
                    { id: 'D', text: "How to buy the best software" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "How does Mark Zuckerberg describe the unique power of programming?",
                options: [
                    { id: 'A', text: "It is the fastest way to become famous" },
                    { id: 'B', text: "It allows you to make something completely new from scratch" },
                    { id: 'C', text: "It is the only way to communicate with machines" },
                    { id: 'D', text: "It helps you organize your digital files" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 5,
                question: "What does Ali Partovi suggest is the universal benefit of learning a computer program?",
                options: [
                    { id: 'A', text: "Everyone will become a professional coder" },
                    { id: 'B', text: "It will help people sleep better" },
                    { id: 'C', text: "It will teach everyone how to think" },
                    { id: 'D', text: "It will replace the need for traditional schools" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'Course Overview',
        category: 'html',
        questions: [            
            {
                id: 1,
                question: "Which technology is responsible for making websites interactive, such as triggering animations or handling button clicks?",
                options: [
                    { id: 'A', text: "HTML" },
                    { id: 'B', text: "Skeletal Language" },
                    { id: 'C', text: "JavaScript" },
                    { id: 'D', text: "Plain Text" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "Using the car analogy, which technology represents the 'skeleton' or framework of a web page?",
                options: [
                    { id: 'A', text: "JavaScript" },
                    { id: 'B', text: "CSS" },
                    { id: 'C', text: "HTML" },
                    { id: 'D', text: "Python" }
                ],
                correctAnswer: 'C',
            },            
            {
                id: 3,
                question: "According to the summary, where do HTML, CSS, and JavaScript work together in harmony?",
                options: [
                    { id: 'A', text: "Inside the car's engine" },
                    { id: 'B', text: "Inside your browser" },
                    { id: 'C', text: "Only on mobile apps" },
                    { id: 'D', text: "In a physical workshop" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "What is the primary role of Cascading Style Sheets (CSS) according to the text?",
                options: [
                    { id: 'A', text: "To create the skeleton of the car" },
                    { id: 'B', text: "To give life, beauty, and polish to the HTML structure" },
                    { id: 'C', text: "To make buttons open doors automatically" },
                    { id: 'D', text: "To define what content shows up on the page" }
                ],
                correctAnswer: 'B',
            },

            {
                id: 5,
                question: "What happens to an HTML page without the addition of CSS?",
                options: [
                    { id: 'A', text: "It becomes highly interactive" },
                    { id: 'B', text: "It isn't very attractive and looks like a bare frame" },
                    { id: 'C', text: "It automatically installs 'leather seats' and 'paint'" },
                    { id: 'D', text: "It cannot be viewed in a web browser" }
                ],
                correctAnswer: 'B',
            },

        ],
    },
    {
        topic: 'Code Editors',
        category: 'html',
        questions: [            
            {
                id: 1,
                question: "Which code editor is identified as the most widely used today and the official choice for this course?",
                options: [
                    { id: 'A', text: "Notepad++" },
                    { id: 'B', text: "Atom" },
                    { id: 'C', text: "Visual Studio Code" },
                    { id: 'D', text: "Brackets" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "What is the purpose of the 'IntelliSense' feature in our selected editor for the course?",
                options: [
                    { id: 'A', text: "To host your website on the internet" },
                    { id: 'B', text: "To provide auto-complete, error detection, and code suggestions" },
                    { id: 'C', text: "To record video tutorials of your coding sessions" },
                    { id: 'D', text: "To uninstall unnecessary software from your computer" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 3,
                question: "If you are a smartphone user, which app is recommended for coding?",
                options: [
                    { id: 'A', text: "Sublime Text Mobile" },
                    { id: 'B', text: "TrebEdit" },
                    { id: 'C', text: "PlayCode" },
                    { id: 'D', text: "CodePen App" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "What is a key advantage of using online code editors like CodePen?",
                options: [
                    { id: 'A', text: "They require a very powerful computer to run" },
                    { id: 'B', text: "They only work on Windows operating systems" },
                    { id: 'C', text: "They don't require the installation of any software" },
                    { id: 'D', text: "They are the only way to use HTML" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 5,
                question: "Which feature in VS Code allows you to see a real-time preview of your webpage as you write code?",
                options: [
                    { id: 'A', text: "Built-in Terminal" },
                    { id: 'B', text: "Cross-platform support" },
                    { id: 'C', text: "Live Server" },
                    { id: 'D', text: "Notepad++ Extension" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'HTML Page Structure',
        category: 'html',
        questions: [
            {
                    id: 1,
                    question: "What is the primary purpose of the <!DOCTYPE html> declaration?",
                    options: [
                        { id: 'A', text: "To link an external CSS stylesheet" },
                        { id: 'B', text: "To tell the browser the document is using HTML5" },
                        { id: 'C', text: "To set the language of the webpage to English" },
                        { id: 'D', text: "To create a comment for the developers" }
                    ],
                    correctAnswer: 'B',
                },
                {
                    id: 2,
                    question: "Which HTML tag is used to contain metadata that is NOT visible to the user?",
                    options: [
                        { id: 'A', text: "<body>" },
                        { id: 'B', text: "<html>" },
                        { id: 'C', text: "<head>" },
                        { id: 'D', text: "<script>" }
                    ],
                    correctAnswer: 'C',
                },
                {
                    id: 3,
                    question: "Why is the 'viewport' meta tag included in the boilerplate?",
                    options: [
                        { id: 'A', text: "To enable responsive design and content resizing for mobile devices" },
                        { id: 'B', text: "To change the background color of the webpage" },
                        { id: 'C', text: "To hide the code from the browser's engine" },
                        { id: 'D', text: "To translate the page into different languages automatically" }
                    ],
                    correctAnswer: 'A',
                },
                {
                    id: 4,
                    question: "Where is the best place to link JavaScript to allow the HTML to load first?",
                    options: [
                        { id: 'A', text: "At the very top of the <head> section" },
                        { id: 'B', text: "Inside the <!DOCTYPE> declaration" },
                        { id: 'C', text: "At the bottom of the <body> section" },
                        { id: 'D', text: "Inside an HTML comment" }
                    ],
                    correctAnswer: 'C',
                },
                {
                    id: 5,
                    question: "How does a web browser treat content placed inside HTML comments?",
                    options: [
                        { id: 'A', text: "It displays it as a bold heading" },
                        { id: 'B', text: "It ignores the content and does not render it" },
                        { id: 'C', text: "It uses it to set the page title" },
                        { id: 'D', text: "It executes it as a JavaScript function" }
                    ],
                    correctAnswer: 'B',
                }
        ],
    },
    {
        topic: 'Lists',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "What is the main difference between an ordered list (<ol>) and an unordered list (<ul>)?",
                options: [
                    { id: 'A', text: "Ordered lists use bullet points while unordered lists use numbers" },
                    { id: 'B', text: "Ordered lists are for items where sequence matters; unordered lists are for items where order doesn't matter" },
                    { id: 'C', text: "Ordered lists only work in VS Code, while unordered lists work in Trebedit" },
                    { id: 'D', text: "Unordered lists are the only type that can be nested" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "Which attribute is used to change the numbering style (e.g., to Roman numerals or letters) in an ordered list?",
                options: [
                    { id: 'A', text: "style" },
                    { id: 'B', text: "list-style" },
                    { id: 'C', text: "type" },
                    { id: 'D', text: "format" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "What is the default marker for an unordered list (<ul>) in the browser?",
                options: [
                    { id: 'A', text: "Numbers (1, 2, 3)" },
                    { id: 'B', text: "Hollow circles" },
                    { id: 'C', text: "Solid bullet points (disc)" },
                    { id: 'D', text: "Squares" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 4,
                question: "Which CSS property-value pair is used to change unordered list bullets to a solid square?",
                options: [
                    { id: 'A', text: "list-style-type: square;" },
                    { id: 'B', text: "marker: square;" },
                    { id: 'C', text: "type='square'" },
                    { id: 'D', text: "list-style: none;" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 5,
                question: "What does 'Nesting Lists' refer to in HTML?",
                options: [
                    { id: 'A', text: "Deleting a list from the code" },
                    { id: 'B', text: "Placing one list inside another list item to create subcategories" },
                    { id: 'C', text: "Changing the color of a list using CSS" },
                    { id: 'D', text: "Linking a list to an external JavaScript file" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 6,
                question: "To display an ordered list with Uppercase Roman numerals (I, II, III), what should the 'type' attribute be set to?",
                options: [
                    { id: 'A', text: "type='1'" },
                    { id: 'B', text: "type='a'" },
                    { id: 'C', text: "type='I'" },
                    { id: 'D', text: "type='roman'" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'HTML Tables',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "Which HTML tag is used to wrap the entire content of a table?",
                options: [
                    { id: 'A', text: "<tr>" },
                    { id: 'B', text: "<thead>" },
                    { id: 'C', text: "<table>" },
                    { id: 'D', text: "<tab>" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "What does the <tr> tag represent in an HTML table?",
                options: [
                    { id: 'A', text: "Table Row" },
                    { id: 'B', text: "Table Rank" },
                    { id: 'C', text: "Table Rule" },
                    { id: 'D', text: "Table Real" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 3,
                question: "By default, how does the browser style text inside a <th> (Table Header) tag?",
                options: [
                    { id: 'A', text: "Italicized and left-aligned" },
                    { id: 'B', text: "Bold and centered" },
                    { id: 'C', text: "Underlined and right-aligned" },
                    { id: 'D', text: "Normal font weight and blue color" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "Which tag is used to define a standard data cell within a table row?",
                options: [
                    { id: 'A', text: "<th>" },
                    { id: 'B', text: "<data>" },
                    { id: 'C', text: "<td>" },
                    { id: 'D', text: "<cell>" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 5,
                question: "If your table code is correct but lacks visible grid lines, which attribute can you add to the <table> tag for a quick border?",
                options: [
                    { id: 'A', text: "line='solid'" },
                    { id: 'B', text: "grid='true'" },
                    { id: 'C', text: "outline='1'" },
                    { id: 'D', text: "border='1'" }
                ],
                correctAnswer: 'D',
            }
        ],
    },
    {
        topic: 'HTML Images',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "Which of the following is true about the <img> tag?",
                options: [
                    { id: 'A', text: "It requires a closing </img> tag" },
                    { id: 'B', text: "It is a self-closing tag" },
                    { id: 'C', text: "It is used to create clickable links" },
                    { id: 'D', text: "It must be placed inside the <head> section" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "What does the 'src' attribute stand for in an <img> tag?",
                options: [
                    { id: 'A', text: "Screen" },
                    { id: 'B', text: "Search" },
                    { id: 'C', text: "Source" },
                    { id: 'D', text: "Script" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "How do you correctly point to an image named 'logo.png' located inside a folder called 'assets'?",
                options: [
                    { id: 'A', text: "src='logo.png'" },
                    { id: 'B', text: "src='./assets/logo.png'" },
                    { id: 'C', text: "href='./assets/logo.png'" },
                    { id: 'D', text: "link='./assets/logo.png'" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "When using the 'width' and 'height' attributes directly (not inside a style attribute), how should the values be written?",
                options: [
                    { id: 'A', text: "width='120px'" },
                    { id: 'B', text: "width='120'" },
                    { id: 'C', text: "width: 120;" },
                    { id: 'D', text: "size='120'" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 5,
                question: "Which attribute allows you to use a full URL to display an image from another website?",
                options: [
                    { id: 'A', text: "url" },
                    { id: 'B', text: "link" },
                    { id: 'C', text: "src" },
                    { id: 'D', text: "href" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'HTML Hyperlinks',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "Which HTML tag is known as the 'anchor' tag and is used to create hyperlinks?",
                options: [
                    { id: 'A', text: "<link>" },
                    { id: 'B', text: "<a>" },
                    { id: 'C', text: "<href>" },
                    { id: 'D', text: "<nav>" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "What does the 'href' attribute specify in a hyperlink?",
                options: [
                    { id: 'A', text: "The font size of the link text" },
                    { id: 'B', text: "The destination URL the link points to" },
                    { id: 'C', text: "The name of the user clicking the link" },
                    { id: 'D', text: "The color of the anchor tag" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 3,
                question: "By default, where do hyperlinks open when clicked?",
                options: [
                    { id: 'A', text: "In a new browser window" },
                    { id: 'B', text: "In a new tab" },
                    { id: 'C', text: "In the same browser tab" },
                    { id: 'D', text: "In a pop-up alert box" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 4,
                question: "Which value should be assigned to the 'target' attribute to ensure a link opens in a new tab?",
                options: [
                    { id: 'A', text: "_self" },
                    { id: 'B', text: "_new" },
                    { id: 'C', text: "_tab" },
                    { id: 'D', text: "_blank" }
                ],
                correctAnswer: 'D',
            },
            {
                id: 5,
                question: "According to the text, why is using target='_blank' useful for website owners?",
                options: [
                    { id: 'A', text: "It makes the link load faster" },
                    { id: 'B', text: "It keeps users on your webpage while they explore the external link" },
                    { id: 'C', text: "It automatically follows the user on social media" },
                    { id: 'D', text: "It hides the URL from the browser's address bar" }
                ],
                correctAnswer: 'B',
            }
        ],
    },
    {
        topic: 'Inline & Block Elements',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "How does a block-level element behave by default in a web page layout?",
                options: [
                    { id: 'A', text: "It only takes up as much width as its content needs" },
                    { id: 'B', text: "It always starts on a new line and stretches to the full width of its container" },
                    { id: 'C', text: "It remains on the same line as the previous element" },
                    { id: 'D', text: "It is hidden from the user until hovered over" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "Which of the following is a common example of a block-level element used as a container?",
                options: [
                    { id: 'A', text: "<span>" },
                    { id: 'B', text: "<a>" },
                    { id: 'C', text: "<div>" },
                    { id: 'D', text: "<img>" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "What is a defining characteristic of an inline element?",
                options: [
                    { id: 'A', text: "It forces a line break before and after the element" },
                    { id: 'B', text: "It adds a large margin above and below the content" },
                    { id: 'C', text: "It only takes up as much width as its content needs and does not start a new line" },
                    { id: 'D', text: "It can only be used inside the <head> tag" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 4,
                question: "Which tag is commonly used to style a specific part of text inside a block element without breaking the line?",
                options: [
                    { id: 'A', text: "<section>" },
                    { id: 'B', text: "<span>" },
                    { id: 'C', text: "<p>" },
                    { id: 'D', text: "<h1>" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 5,
                question: "Which pair of inline tags is used to make text appear bold?",
                options: [
                    { id: 'A', text: "<i> or <em>" },
                    { id: 'B', text: "<sup> or <sub>" },
                    { id: 'C', text: "<b> or <strong>" },
                    { id: 'D', text: "<br> or <small>" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'Forms, Types & Fields',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "Which HTML tag is used to wrap all elements of a user input form?",
                options: [
                    { id: 'A', text: "<input>" },
                    { id: 'B', text: "<label>" },
                    { id: 'C', text: "<form>" },
                    { id: 'D', text: "<section>" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "Which input type should be used to ensure characters entered by the user are hidden?",
                options: [
                    { id: 'A', text: "type='text'" },
                    { id: 'B', text: "type='hidden'" },
                    { id: 'C', text: "type='password'" },
                    { id: 'D', text: "type='secret'" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "To ensure that only one radio button can be selected from a group, what must all radio inputs in that group share?",
                options: [
                    { id: 'A', text: "The same 'id' attribute" },
                    { id: 'B', text: "The same 'name' attribute" },
                    { id: 'C', text: "The same 'value' attribute" },
                    { id: 'D', text: "The same 'placeholder' attribute" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "Which tag is used to create a dropdown list, and which tag is used for the individual items inside it?",
                options: [
                    { id: 'A', text: "<dropdown> and <item>" },
                    { id: 'B', text: "<list> and <li>" },
                    { id: 'C', text: "<select> and <option>" },
                    { id: 'D', text: "<form> and <input>" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 5,
                question: "Which tag is specifically designed for multi-line text input, such as a message or comment box?",
                options: [
                    { id: 'A', text: "<input type='text'>" },
                    { id: 'B', text: "<textarea>" },
                    { id: 'C', text: "<textblock>" },
                    { id: 'D', text: "<div>" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 6,
                question: "What attribute can be added to a <select> tag to allow users to choose more than one option?",
                options: [
                    { id: 'A', text: "multi='true'" },
                    { id: 'B', text: "checkbox" },
                    { id: 'C', text: "multiple" },
                    { id: 'D', text: "rows='5'" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 7,
                question: "What is the purpose of the 'placeholder' attribute in an input field?",
                options: [
                    { id: 'A', text: "To set the permanent value of the field" },
                    { id: 'B', text: "To provide a short hint that describes the expected value of the field" },
                    { id: 'C', text: "To hide the input field from the user" },
                    { id: 'D', text: "To validate that the user has entered an email" }
                ],
                correctAnswer: 'B',
            }
        ],
    },
    {
        topic: 'Styling',
        category: 'html',
        questions: [
            {
                id: 1,
                question: "What is the primary purpose of HTML inline styling?",
                options: [
                    { id: 'A', text: "To create a separate CSS file for the project" },
                    { id: 'B', text: "To apply CSS directly within an HTML tag using the style attribute" },
                    { id: 'C', text: "To define the skeletal structure of a web page" },
                    { id: 'D', text: "To make a website interactive and responsive to clicks" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "Which attribute is used to apply CSS rules directly to an individual HTML element?",
                options: [
                    { id: 'A', text: "class" },
                    { id: 'B', text: "id" },
                    { id: 'C', text: "style" },
                    { id: 'D', text: "format" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 3,
                question: "What is the correct syntax for applying a background color to a <div> using inline styling?",
                options: [
                    { id: 'A', text: "<div background='blue'>" },
                    { id: 'B', text: "<div style='background: blue;'>" },
                    { id: 'C', text: "<div color: blue;>" },
                    { id: 'D', text: "<div css='background-color: blue'>" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "According to the text, when is HTML inline styling best used?",
                options: [
                    { id: 'A', text: "For large-scale professional projects" },
                    { id: 'B', text: "When you want to reuse styles across multiple pages" },
                    { id: 'C', text: "For quick testing or applying a one-off style to a single element" },
                    { id: 'D', text: "To keep the HTML code as clean as possible" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 5,
                question: "Which of the following is recommended for larger projects instead of inline styling for better structure and reusability?",
                options: [
                    { id: 'A', text: "Using more <div> tags" },
                    { id: 'B', text: "Using only inline styles for every element" },
                    { id: 'C', text: "Internal or external stylesheets" },
                    { id: 'D', text: "Notepad++ default formatting" }
                ],
                correctAnswer: 'C',
            }
        
        ],
    },
    {
        topic: '',
        category: 'html',
        questions: [
            
        ],
    },









// BASIC CSS QUIZ


    {
        topic: 'Introduction to CSS',
        category: 'css1',
        questions: [
            {
                id: 1,
                question: "According to the text, what was the original purpose of HTML?",
                options: [
                    { id: 'A', text: "To control fonts and colors on a webpage" },
                    { id: 'B', text: "To solely structure and describe the content of a webpage" },
                    { id: 'C', text: "To act as a central location for styling rules" },
                    { id: 'D', text: "To replace the need for CSS entirely" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 2,
                question: "Why is applying styles manually to every tag on every page considered a problem for large websites?",
                options: [
                    { id: 'A', text: "It is repetitive and very time-consuming" },
                    { id: 'B', text: "Browsers cannot render manual styles" },
                    { id: 'C', text: "It makes the website load faster than using CSS" },
                    { id: 'D', text: "The World Wide Web Consortium (W3C) banned it" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 3,
                question: "Which organization introduced CSS to solve the difficulties of styling in HTML?",
                options: [
                    { id: 'A', text: "Microsoft" },
                    { id: 'B', text: "The World Wide Web Consortium (W3C)" },
                    { id: 'C', text: "Google" },
                    { id: 'D', text: "The Apple Inc. Design Team" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 4,
                question: "What is a major benefit of using a single CSS file to manage styling rules?",
                options: [
                    { id: 'A', text: "It allows you to change the look of an entire website by editing one file" },
                    { id: 'B', text: "It makes the HTML code more complex and harder to read" },
                    { id: 'C', text: "It eliminates the need for any HTML tags" },
                    { id: 'D', text: "It only works for small personal blogs" }
                ],
                correctAnswer: 'A',
            } 
        ],
    },
    {
        topic: 'Inserting CSS',
        category: 'css1',
        questions: [
            {
                id: 1,
                question: "Which CSS method is considered the most common and scalable for large, multi-page websites?",
                options: [
                    { id: 'A', text: "Inline Styling" },
                    { id: 'B', text: "Internal Styling" },
                    { id: 'C', text: "External Styling" },
                    { id: 'D', text: "JavaScript Styling" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "Where must the <link> tag be placed when using an external stylesheet?",
                options: [
                    { id: 'A', text: "At the bottom of the <body> section" },
                    { id: 'B', text: "Inside the <head> section" },
                    { id: 'C', text: "Directly inside the <html> tag" },
                    { id: 'D', text: "Inside a <div> container" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 3,
                question: "What is a primary drawback of using Inline Styling mentioned in the text?",
                options: [
                    { id: 'A', text: "It is not reusable across pages and can clutter your HTML" },
                    { id: 'B', text: "It requires a separate .css file to work" },
                    { id: 'C', text: "It only works for the background-color property" },
                    { id: 'D', text: "It is the most expensive method to use" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 4,
                question: "Which method involves placing CSS rules inside a <style> tag within the HTML file?",
                options: [
                    { id: 'A', text: "External Styling" },
                    { id: 'B', text: "Inline Styling" },
                    { id: 'C', text: "Internal Styling" },
                    { id: 'D', text: "Boilerplate Styling" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'CSS Syntax',
        category: 'css1',
        questions: [
            {
                id: 1,
                question: "What are the two main parts that make up every CSS rule?",
                options: [
                    { id: 'A', text: "The skeleton and the skin" },
                    { id: 'B', text: "The selector and the declaration block" },
                    { id: 'C', text: "The property and the colon" },
                    { id: 'D', text: "The tag and the link" }
                ],
                correctAnswer: 'B', //
            },
            {
                id: 2,
                question: "What is the role of the 'selector' in a CSS rule?",
                options: [
                    { id: 'A', text: "It defines the font size of the text" },
                    { id: 'B', text: "It points to the HTML element you want to style" },
                    { id: 'C', text: "It ends the declaration block" },
                    { id: 'D', text: "It links an external CSS file" }
                ],
                correctAnswer: 'B', //
            },
            {
                id: 3,
                question: "Which symbol is used to separate a CSS property from its value?",
                options: [
                    { id: 'A', text: "A semicolon (;)" },
                    { id: 'B', text: "A comma (,)" },
                    { id: 'C', text: "A colon (:)" },
                    { id: 'D', text: "A period (.)" }
                ],
                correctAnswer: 'C', //
            },
            {
                id: 4,
                question: "What is the purpose of the semicolon (;) in a CSS declaration block?",
                options: [
                    { id: 'A', text: "To start a new selector" },
                    { id: 'B', text: "To separate multiple declarations inside the block" },
                    { id: 'C', text: "To open the declaration block" },
                    { id: 'D', text: "To define a hex color code" }
                ],
                correctAnswer: 'B', //
            },
            {
                id: 5,
                question: "In the example 'p { color: blue; }', what is 'color'?",
                options: [
                    { id: 'A', text: "The selector" },
                    { id: 'B', text: "The value" },
                    { id: 'C', text: "The property" },
                    { id: 'D', text: "The declaration block" }
                ],
                correctAnswer: 'C', //
            }
        ],
    },
    {
        topic: 'Selectors',
        category: 'css1',
        questions: [
            {
                id: 1,
                question: "Which CSS selector targets HTML elements directly by their tag name?",
                options: [
                    { id: 'A', text: "ID Selector" },
                    { id: 'B', text: "Class Selector" },
                    { id: 'C', text: "Element Selector" },
                    { id: 'D', text: "Universal Selector" }
                ],
                correctAnswer: 'C',
            },
            {
                id: 2,
                question: "What symbol is used before the name of an ID selector in CSS?",
                options: [
                    { id: 'A', text: "A dot (.)" },
                    { id: 'B', text: "A hash (#)" },
                    { id: 'C', text: "An asterisk (*)" },
                    { id: 'D', text: "A comma (,)" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 3,
                question: "True or False: IDs must be unique on a single webpage.",
                options: [
                    { id: 'A', text: "True" },
                    { id: 'B', text: "False" }
                ],
                correctAnswer: 'A',
            },
            {
                id: 4,
                question: "What is the primary use of the Universal Selector (*)?",
                options: [
                    { id: 'A', text: "To style only the <body> tag" },
                    { id: 'B', text: "To select all elements on the page" },
                    { id: 'C', text: "To group two different selectors together" },
                    { id: 'D', text: "To target elements by their ID" }
                ],
                correctAnswer: 'B',
            },
            {
                id: 5,
                question: "How do you separate different selectors when using a Group Selector to share the same styles?",
                options: [
                    { id: 'A', text: "With a dot" },
                    { id: 'B', text: "With a semicolon" },
                    { id: 'C', text: "With a comma" },
                    { id: 'D', text: "With a hash" }
                ],
                correctAnswer: 'C',
            }
        ],
    },
    {
        topic: 'Colors',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "What does RGB stand for in CSS color values?",
        options: [
            { id: 'A', text: "Real, Green, Black" },
            { id: 'B', text: "Red, Gray, Blue" },
            { id: 'C', text: "Red, Green, Blue" },
            { id: 'D', text: "Random, Gradient, Brightness" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "What is the range of numeric values for each color in the RGB system?",
        options: [
            { id: 'A', text: "0 to 100" },
            { id: 'B', text: "0 to 255" },
            { id: 'C', text: "1 to 360" },
            { id: 'D', text: "0.0 to 1.0" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "In the RGBA color system, what does the 'Alpha' value control?",
        options: [
            { id: 'A', text: "The brightness of the color" },
            { id: 'B', text: "The transparency or opacity" },
            { id: 'C', text: "The saturation level" },
            { id: 'D', text: "The hue on the color wheel" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "Which color system uses base-16 values and starts with a hash (#) symbol?",
        options: [
            { id: 'A', text: "HSL" },
            { id: 'B', text: "HEX" },
            { id: 'C', text: "RGBA" },
            { id: 'D', text: "RGB" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "If you want a color to be 30% opaque (mostly transparent), what alpha value should be used in RGBA?",
        options: [
            { id: 'A', text: "30" },
            { id: 'B', text: "3.0" },
            { id: 'C', text: "0.3" },
            { id: 'D', text: "0.03" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Background',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which CSS property is used to set an image as the background of an element?",
        options: [
            { id: 'A', text: "background-color" },
            { id: 'B', text: "background-image" },
            { id: 'C', text: "image-source" },
            { id: 'D', text: "background-url" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What is the default behavior of a background image in CSS regarding repetition?",
        options: [
            { id: 'A', text: "It does not repeat" },
            { id: 'B', text: "It repeats only horizontally" },
            { id: 'C', text: "It repeats both horizontally and vertically" },
            { id: 'D', text: "It repeats only vertically" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "Which property determines whether a background image scrolls with the rest of the page or remains fixed?",
        options: [
            { id: 'A', text: "background-position" },
            { id: 'B', text: "background-attachment" },
            { id: 'C', text: "background-size" },
            { id: 'D', text: "background-repeat" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "Which value for the 'background-size' property ensures the image covers the entire background area, even if it has to be cropped?",
        options: [
            { id: 'A', text: "contain" },
            { id: 'B', text: "fill" },
            { id: 'C', text: "cover" },
            { id: 'D', text: "auto" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "What is the correct order of properties when using the CSS background shorthand?",
        options: [
            { id: 'A', text: "color, image, repeat, attachment, position" },
            { id: 'B', text: "image, color, position, repeat, attachment" },
            { id: 'C', text: "attachment, repeat, image, color, position" },
            { id: 'D', text: "position, size, repeat, image, color" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "Which property allows you to move a background image to the 'center top' of its container?",
        options: [
            { id: 'A', text: "background-attachment" },
            { id: 'B', text: "background-position" },
            { id: 'C', text: "background-origin" },
            { id: 'D', text: "background-clip" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 7,
        question: "How do you correctly specify an image file named 'bg.png' for a background-image property?",
        options: [
            { id: 'A', text: "background-image: 'bg.png';" },
            { id: 'B', text: "background-image: src('bg.png');" },
            { id: 'C', text: "background-image: url('bg.png');" },
            { id: 'D', text: "background-image: link('bg.png');" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Borders',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which property is used to define the type of line for an element's boundary (e.g., solid, dashed, or dotted)?",
        options: [
            { id: 'A', text: "border-width" },
            { id: 'B', text: "border-line" },
            { id: 'C', text: "border-style" },
            { id: 'D', text: "border-type" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "When providing four values for a border property (like 'border-style: dotted dashed solid double;'), what is the correct order in which they are applied?",
        options: [
            { id: 'A', text: "Top, Bottom, Left, Right" },
            { id: 'B', text: "Top, Right, Bottom, Left" },
            { id: 'C', text: "Left, Right, Top, Bottom" },
            { id: 'D', text: "Clockwise starting from the Left" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which of the following is NOT a valid keyword for the 'border-width' property?",
        options: [
            { id: 'A', text: "thin" },
            { id: 'B', text: "medium" },
            { id: 'C', text: "thick" },
            { id: 'D', text: "bold" }
        ],
        correctAnswer: 'D',
    },
    {
        id: 4,
        question: "What is the correct order for the values in the 'border' shorthand property?",
        options: [
            { id: 'A', text: "style, width, color" },
            { id: 'B', text: "width, style, color" },
            { id: 'C', text: "color, width, style" },
            { id: 'D', text: "width, color, style" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "Which property allows you to add rounded corners to an element?",
        options: [
            { id: 'A', text: "border-corner" },
            { id: 'B', text: "border-radius" },
            { id: 'C', text: "border-style" },
            { id: 'D', text: "border-shape" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "How would you style the color of only the bottom border of a paragraph?",
        options: [
            { id: 'A', text: "border-color-bottom" },
            { id: 'B', text: "bottom-border-color" },
            { id: 'C', text: "border-bottom-color" },
            { id: 'D', text: "border-style-bottom" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 7,
        question: "What does the style value 'double' represent for a border?",
        options: [
            { id: 'A', text: "A border that is twice as thick" },
            { id: 'B', text: "A border with two parallel lines" },
            { id: 'C', text: "A border that appears on both the top and bottom" },
            { id: 'D', text: "A border that changes color twice" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Box Model',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which of the following represents the correct order of the Box Model layers, from the innermost to the outermost?",
        options: [
            { id: 'A', text: "Margin → Border → Padding → Content" },
            { id: 'B', text: "Content → Padding → Border → Margin" },
            { id: 'C', text: "Content → Border → Padding → Margin" },
            { id: 'D', text: "Padding → Content → Border → Margin" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "In the 'gift box' analogy, what does the 'Padding' represent?",
        options: [
            { id: 'A', text: "The actual gift inside" },
            { id: 'B', text: "The space between the gift and the inner walls of the box" },
            { id: 'C', text: "The cardboard walls of the box" },
            { id: 'D', text: "The distance between two different gift boxes" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which area is responsible for creating space outside the border to separate an element from its neighbors?",
        options: [
            { id: 'A', text: "Padding" },
            { id: 'B', text: "Content" },
            { id: 'C', text: "Margin" },
            { id: 'D', text: "Outline" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "What is a key difference between Margin and Padding?",
        options: [
            { id: 'A', text: "Padding is outside the border, while Margin is inside" },
            { id: 'B', text: "Margin inherits the background color, while Padding is transparent" },
            { id: 'C', text: "Padding is inside the border, while Margin is outside and always transparent" },
            { id: 'D', text: "There is no functional difference between the two" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "How does an 'Outline' differ from a 'Border'?",
        options: [
            { id: 'A', text: "Outlines are inside the padding" },
            { id: 'B', text: "Outlines take up more layout space than borders" },
            { id: 'C', text: "Outlines are drawn outside the border but do not take up space or affect layout" },
            { id: 'D', text: "Outlines cannot have a specific color" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 6,
        question: "Which property adds space specifically between the border and the outline?",
        options: [
            { id: 'A', text: "margin-offset" },
            { id: 'B', text: "padding-outer" },
            { id: 'C', text: "outline-offset" },
            { id: 'D', text: "border-spacing" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 7,
        question: "Using shorthand 'padding: 10px 20px 15px 5px;', which value represents the left padding?",
        options: [
            { id: 'A', text: "10px" },
            { id: 'B', text: "20px" },
            { id: 'C', text: "15px" },
            { id: 'D', text: "5px" }
        ],
        correctAnswer: 'D',
    }
        ],
    },
    {
        topic: 'Height & Width',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "By default, what is the width of a block-level element like a <div>?",
        options: [
            { id: 'A', text: "It is always 300px wide" },
            { id: 'B', text: "It spans the entire width of its parent container" },
            { id: 'C', text: "It only takes up as much width as the content inside it" },
            { id: 'D', text: "It has a width of 0px until styled" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which CSS property ensures that an element does not become wider than a certain limit, even if the screen is large?",
        options: [
            { id: 'A', text: "min-width" },
            { id: 'B', text: "auto-width" },
            { id: 'C', text: "max-width" },
            { id: 'D', text: "limit-width" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "What does the 'vh' unit represent when setting the height of an element?",
        options: [
            { id: 'A', text: "Vertical Height" },
            { id: 'B', text: "Variable Height" },
            { id: 'C', text: "Viewport Height" },
            { id: 'D', text: "Visual Height" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "To horizontally center a block-level element with a fixed width, which property-value pair should you use alongside 'width'?",
        options: [
            { id: 'A', text: "text-align: center;" },
            { id: 'B', text: "margin: auto;" },
            { id: 'C', text: "padding: auto;" },
            { id: 'D', text: "display: center;" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "Which property ensures that an element maintains at least a specific amount of vertical space, even if it is empty?",
        options: [
            { id: 'A', text: "min-height" },
            { id: 'B', text: "base-height" },
            { id: 'C', text: "max-height" },
            { id: 'D', text: "static-height" }
        ],
        correctAnswer: 'A',
    }
        ],
    },
    {
        topic: 'Text Formatting',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which property is used to horizontally align text as 'left', 'right', 'center', or 'justify'?",
        options: [
            { id: 'A', text: "vertical-align" },
            { id: 'B', text: "text-indent" },
            { id: 'C', text: "text-align" },
            { id: 'D', text: "direction" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "What is the purpose of the 'text-transform' property?",
        options: [
            { id: 'A', text: "To change the font family of the text" },
            { id: 'B', text: "To add a shadow effect behind the text" },
            { id: 'C', text: "To control letter casing like uppercase, lowercase, or capitalize" },
            { id: 'D', text: "To adjust the space between words" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "Which property would you use to create a 'strikethrough' effect (a line through the text)?",
        options: [
            { id: 'A', text: "text-decoration-line: overline;" },
            { id: 'B', text: "font-style: italic;" },
            { id: 'C', text: "text-decoration-line: line-through;" },
            { id: 'D', text: "text-transform: capitalize;" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "In the 'text-shadow: 2px 2px 5px red;' declaration, what does the third value (5px) represent?",
        options: [
            { id: 'A', text: "Horizontal offset" },
            { id: 'B', text: "Vertical offset" },
            { id: 'C', text: "Blur radius" },
            { id: 'D', text: "Shadow transparency" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "Which property defines the vertical space between lines of text in a paragraph?",
        options: [
            { id: 'A', text: "letter-spacing" },
            { id: 'B', text: "word-spacing" },
            { id: 'C', text: "line-height" },
            { id: 'D', text: "white-space" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 6,
        question: "When using 'font-family', why is it recommended to list multiple fonts ending with a generic family like 'sans-serif'?",
        options: [
            { id: 'A', text: "To make the text look more colorful" },
            { id: 'B', text: "To provide a fallback in case the browser doesn't support the first font" },
            { id: 'C', text: "To automatically bold the text" },
            { id: 'D', text: "To decrease the file size of the webpage" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 7,
        question: "Which value for 'font-variant' displays the text in small capital letters?",
        options: [
            { id: 'A', text: "italic" },
            { id: 'B', text: "bold" },
            { id: 'C', text: "small-caps" },
            { id: 'D', text: "capitalize" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Links',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which CSS pseudo-class is used to style a link that a user has not yet clicked?",
        options: [
            { id: 'A', text: ":hover" },
            { id: 'B', text: ":visited" },
            { id: 'C', text: ":link" },
            { id: 'D', text: ":active" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "What is the default browser styling for a link that has already been clicked (visited)?",
        options: [
            { id: 'A', text: "Blue and underlined" },
            { id: 'B', text: "Green and bold" },
            { id: 'C', text: "Purple and underlined" },
            { id: 'D', text: "Red and italicized" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "In what specific order must link states be defined in CSS to function correctly?",
        options: [
            { id: 'A', text: "hover → active → link → visited" },
            { id: 'B', text: "link → visited → hover → active" },
            { id: 'C', text: "active → hover → visited → link" },
            { id: 'D', text: "visited → link → active → hover" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "Which state is triggered at the exact moment a user is clicking down on a link?",
        options: [
            { id: 'A', text: ":link" },
            { id: 'B', text: ":hover" },
            { id: 'C', text: ":active" },
            { id: 'D', text: ":visited" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "If you want to remove the default underline from a link in its normal state, which property-value pair should you use?",
        options: [
            { id: 'A', text: "text-style: none;" },
            { id: 'B', text: "link-decoration: none;" },
            { id: 'C', text: "text-decoration: none;" },
            { id: 'D', text: "underline: hidden;" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 6,
        question: "What happens to a link styled with 'a:hover { color: green; }' when the user moves their mouse over it?",
        options: [
            { id: 'A', text: "The link turns green" },
            { id: 'B', text: "The link disappears" },
            { id: 'C', text: "The link opens in a new tab" },
            { id: 'D', text: "The link turns purple" }
        ],
        correctAnswer: 'A',
    }
        ],
    },
    {
        topic: 'CSS Lists',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which CSS property is used to control the marker (bullet or number style) of a list?",
        options: [
            { id: 'A', text: "marker-style" },
            { id: 'B', text: "list-style-type" },
            { id: 'C', text: "bullet-type" },
            { id: 'D', text: "list-format" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What is the default bullet style for an unordered list (<ul>) in CSS?",
        options: [
            { id: 'A', text: "circle" },
            { id: 'B', text: "square" },
            { id: 'C', text: "disc" },
            { id: 'D', text: "none" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "Which value for 'list-style-type' should be used to display an ordered list with Roman numerals like I, II, III?",
        options: [
            { id: 'A', text: "lower-roman" },
            { id: 'B', text: "upper-alpha" },
            { id: 'C', text: "decimal" },
            { id: 'D', text: "upper-roman" }
        ],
        correctAnswer: 'D',
    },
    {
        id: 4,
        question: "If you want to create a list with square bullets, which rule is correct?",
        options: [
            { id: 'A', text: "ul { list-style: square-bullet; }" },
            { id: 'B', text: "ul { marker: square; }" },
            { id: 'C', text: "ul { list-style-type: square; }" },
            { id: 'D', text: "li { bullet: square; }" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "To completely remove the bullets or numbers from a list, which value should you assign to 'list-style-type'?",
        options: [
            { id: 'A', text: "hidden" },
            { id: 'B', text: "none" },
            { id: 'C', text: "0" },
            { id: 'D', text: "invisible" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "Besides 'list-style-type', which other properties are commonly set to 0 to completely remove default browser list styling?",
        options: [
            { id: 'A', text: "border and outline" },
            { id: 'B', text: "margin and padding" },
            { id: 'C', text: "width and height" },
            { id: 'D', text: "font-size and color" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'CSS Tables',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "Which property is used to add borders around the table, headers, and data cells?",
        options: [
            { id: 'A', text: "table-border" },
            { id: 'B', text: "border" },
            { id: 'C', text: "outline" },
            { id: 'D', text: "grid-line" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What does setting 'width: 100%;' on a table element do?",
        options: [
            { id: 'A', text: "It fixes the table width to 100 pixels" },
            { id: 'B', text: "It stretches the table across the entire width of its container" },
            { id: 'C', text: "It makes the table text 100% larger" },
            { id: 'D', text: "It centers the table on the page" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which property should you use to combine separate cell borders into a single, clean border?",
        options: [
            { id: 'A', text: "border-style: join;" },
            { id: 'B', text: "border-collapse: collapse;" },
            { id: 'C', text: "table-layout: fixed;" },
            { id: 'D', text: "border-spacing: 0;" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "How can you make a table row change color when a user moves their mouse over it?",
        options: [
            { id: 'A', text: "tr:active { background-color: #f2f2f2; }" },
            { id: 'B', text: "tr:hover { background-color: #f2f2f2; }" },
            { id: 'C', text: "tr:focus { background-color: #f2f2f2; }" },
            { id: 'D', text: "tr:link { background-color: #f2f2f2; }" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "Which property is used to align text horizontally (left, center, or right) inside table cells?",
        options: [
            { id: 'A', text: "vertical-align" },
            { id: 'B', text: "text-align" },
            { id: 'C', text: "content-align" },
            { id: 'D', text: "padding" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "By default, how do browsers display table cell borders before applying 'border-collapse'?",
        options: [
            { id: 'A', text: "They are merged into one" },
            { id: 'B', text: "They are separate from each other" },
            { id: 'C', text: "They are invisible" },
            { id: 'D', text: "They only appear on the headers" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Icons',
        category: 'css1',
        questions: [
            
        ],
    },
    {
        topic: 'Icons',
        category: 'css1',
        questions: [
            {
        id: 1,
        question: "What is the simplest and most common way to add professional icons to a web page?",
        options: [
            { id: 'A', text: "Drawing them with CSS shapes" },
            { id: 'B', text: "Using an icon library like Font Awesome or Google Material Icons" },
            { id: 'C', text: "Uploading a separate .jpg file for every icon" },
            { id: 'D', text: "Typing them using a standard keyboard" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Where should you place the CDN link when using an icon library like Font Awesome?",
        options: [
            { id: 'A', text: "At the very end of the <body> section" },
            { id: 'B', text: "Inside the <head> section" },
            { id: 'C', text: "Inside the <footer> tag" },
            { id: 'D', text: "In a separate JavaScript file only" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which HTML tags are commonly used to display icons from libraries?",
        options: [
            { id: 'A', text: "<div> or <p>" },
            { id: 'B', text: "<i> or <span>" },
            { id: 'C', text: "<img> or <picture>" },
            { id: 'D', text: "<button> or <form>" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "In Font Awesome, which class prefix is used for icons (e.g., for a home icon)?",
        options: [
            { id: 'A', text: "bi bi-" },
            { id: 'B', text: "material-icons" },
            { id: 'C', text: "fas fa-" },
            { id: 'D', text: "icon-" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "Which icon library uses the 'bi bi-' class prefix?",
        options: [
            { id: 'A', text: "Font Awesome" },
            { id: 'B', text: "Google Material Icons" },
            { id: 'C', text: "Bootstrap Icons" },
            { id: 'D', text: "Simple Line Icons" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
















    // ADVANCED CSS
    {
        topic: 'Layout: Display',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which type of element naturally starts on a new line and takes up the full width of its parent container?",
        options: [
            { id: 'A', text: "Inline elements" },
            { id: 'B', text: "Block-level elements" },
            { id: 'C', text: "Hidden elements" },
            { id: 'D', text: "Floating elements" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which of the following is an example of an 'inline' element by default?",
        options: [
            { id: 'A', text: "<div>" },
            { id: 'B', text: "<p>" },
            { id: 'C', text: "<span>" },
            { id: 'D', text: "<section>" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "If you want to make a <span> behave like a <div> (taking up the full width), which CSS rule should you apply?",
        options: [
            { id: 'A', text: "display: inline;" },
            { id: 'B', text: "display: block;" },
            { id: 'C', text: "visibility: visible;" },
            { id: 'D', text: "display: full;" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "What is the primary difference between 'display: none;' and 'visibility: hidden;'?",
        options: [
            { id: 'A', text: "There is no difference; both do the same thing" },
            { id: 'B', text: "display: none; hides the element but keeps its space, while visibility: hidden; removes it" },
            { id: 'C', text: "display: none; removes the element from the flow, while visibility: hidden; hides it but keeps its space" },
            { id: 'D', text: "visibility: hidden; only works on images" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "How do inline elements handle width and height compared to block-level elements?",
        options: [
            { id: 'A', text: "They only take up as much width as required by their content" },
            { id: 'B', text: "They always take up 100% width" },
            { id: 'C', text: "They start on a new line automatically" },
            { id: 'D', text: "They cannot be styled with colors" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "Which property allows you to hide an element while ensuring the layout of the page remains unchanged (the gap remains)?",
        options: [
            { id: 'A', text: "display: none;" },
            { id: 'B', text: "opacity: 0;" },
            { id: 'C', text: "visibility: hidden;" },
            { id: 'D', text: "display: inline;" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Layout: Overflow',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "What is the default value of the CSS overflow property?",
        options: [
            { id: 'A', text: "hidden" },
            { id: 'B', text: "scroll" },
            { id: 'C', text: "visible" },
            { id: 'D', text: "auto" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "Which overflow value adds scrollbars only when the content actually exceeds the size of the container?",
        options: [
            { id: 'A', text: "scroll" },
            { id: 'B', text: "auto" },
            { id: 'C', text: "hidden" },
            { id: 'D', text: "visible" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "If you want to cut off extra content so it is not seen and no scrollbars are provided, which value should you use?",
        options: [
            { id: 'A', text: "overflow: scroll;" },
            { id: 'B', text: "overflow: auto;" },
            { id: 'C', text: "overflow: hidden;" },
            { id: 'D', text: "overflow: clip-all;" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "How does the 'scroll' value differ from the 'auto' value?",
        options: [
            { id: 'A', text: "'scroll' always shows scrollbars even if the content fits; 'auto' only shows them if needed." },
            { id: 'B', text: "'auto' always shows scrollbars; 'scroll' hides them." },
            { id: 'C', text: "There is no difference between them." },
            { id: 'D', text: "'scroll' only works horizontally; 'auto' works vertically." }
        ],
        correctAnswer: 'A',
    },
    {
        id: 5,
        question: "Which property would you use if you only wanted to control the overflow that happens horizontally (left-to-right)?",
        options: [
            { id: 'A', text: "overflow-y" },
            { id: 'B', text: "overflow-x" },
            { id: 'C', text: "horizontal-overflow" },
            { id: 'D', text: "side-scroll" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "What happens to content with 'overflow: visible;' when it is larger than its container?",
        options: [
            { id: 'A', text: "It is deleted automatically." },
            { id: 'B', text: "It stays inside the box and shrinks." },
            { id: 'C', text: "It spills outside the container's box." },
            { id: 'D', text: "The container expands to fit the content." }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Layout: Position',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which position value is the default for all HTML elements and ignores top, right, bottom, and left properties?",
        options: [
            { id: 'A', text: "relative" },
            { id: 'B', text: "fixed" },
            { id: 'C', text: "static" },
            { id: 'D', text: "sticky" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "How does 'position: relative;' affect an element's placement in the document flow?",
        options: [
            { id: 'A', text: "It removes the element completely from the flow." },
            { id: 'B', text: "The element stays in the flow, but can be offset while its original space is preserved." },
            { id: 'C', text: "It fixes the element to the browser window." },
            { id: 'D', text: "It makes the element behave like a table cell." }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "An element with 'position: absolute;' is positioned relative to what?",
        options: [
            { id: 'A', text: "Always the browser viewport" },
            { id: 'B', text: "The very next sibling element" },
            { id: 'C', text: "The nearest positioned ancestor (relative, absolute, or fixed)" },
            { id: 'D', text: "The center of the screen" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which position value would you use to create a navbar that stays at the top of the screen even as the user scrolls down the page?",
        options: [
            { id: 'A', text: "static" },
            { id: 'B', text: "absolute" },
            { id: 'C', text: "fixed" },
            { id: 'D', text: "relative" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "What is a unique characteristic of 'position: sticky;'?",
        options: [
            { id: 'A', text: "It is a hybrid of relative and fixed that 'sticks' after a scroll threshold." },
            { id: 'B', text: "It only works if the element is inside a <table>." },
            { id: 'C', text: "It makes the element invisible until hovered." },
            { id: 'D', text: "It automatically centers the element." }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "What is the purpose of the 'z-index' property in CSS layout?",
        options: [
            { id: 'A', text: "To zoom in on an image" },
            { id: 'B', text: "To control the stacking order (layering) of overlapping elements" },
            { id: 'C', text: "To set the transparency level of a box" },
            { id: 'D', text: "To align text to the right side of a container" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 7,
        question: "For 'z-index' to function properly, what condition must be met by the element?",
        options: [
            { id: 'A', text: "It must have a background color." },
            { id: 'B', text: "It must be an <img> tag." },
            { id: 'C', text: "It must have a 'position' value other than 'static'." },
            { id: 'D', text: "It must be at least 500px wide." }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Layout: Flexbox',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which CSS property is required to enable Flexbox on a container?",
        options: [
            { id: 'A', text: "position: flex;" },
            { id: 'B', text: "display: flexbox;" },
            { id: 'C', text: "display: flex;" },
            { id: 'D', text: "layout: flexible;" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 2,
        question: "By default, what is the 'flex-direction' of a flex container?",
        options: [
            { id: 'A', text: "column" },
            { id: 'B', text: "row" },
            { id: 'C', text: "stack" },
            { id: 'D', text: "wrap" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which property is used to align items horizontally along the main axis (e.g., center, space-between)?",
        options: [
            { id: 'A', text: "align-items" },
            { id: 'B', text: "justify-content" },
            { id: 'C', text: "flex-wrap" },
            { id: 'D', text: "align-content" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "If you want flex items to move to a new line when there isn't enough space, which property should you use?",
        options: [
            { id: 'A', text: "flex-wrap: wrap;" },
            { id: 'B', text: "flex-flow: nowrap;" },
            { id: 'C', text: "display: block;" },
            { id: 'D', text: "overflow: scroll;" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 5,
        question: "Which property allows an individual flex item to override the container's 'align-items' setting?",
        options: [
            { id: 'A', text: "order" },
            { id: 'B', text: "align-self" },
            { id: 'C', text: "flex-grow" },
            { id: 'D', text: "flex-basis" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "What does the 'flex-grow' property define?",
        options: [
            { id: 'A', text: "The initial size of the item before space is distributed" },
            { id: 'B', text: "The order in which the item appears" },
            { id: 'C', text: "How much a specific item should grow relative to others to fill extra space" },
            { id: 'D', text: "The spacing between items" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 7,
        question: "Which value for 'justify-content' places equal space between items, with no space at the edges of the container?",
        options: [
            { id: 'A', text: "space-around" },
            { id: 'B', text: "center" },
            { id: 'C', text: "space-between" },
            { id: 'D', text: "flex-start" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Layout: Grid',
        category: 'css2',
        questions: [
            {
                id: 1,
                question: "What is the primary difference between Flexbox and CSS Grid?",
                options: [
                    { id: 'A', text: "Flexbox is for images, Grid is for text" },
                    { id: 'B', text: "Flexbox is 1-dimensional, while Grid is 2-dimensional (rows and columns simultaneously)" },
                    { id: 'C', text: "Grid only works on mobile devices" },
                    { id: 'D', text: "Flexbox requires a CDN, while Grid is built-in" }
                ],
                correctAnswer: 'B',
            },
    {
        id: 2,
        question: "Which property is used to define the number and size of columns in a grid container?",
        options: [
            { id: 'A', text: "grid-column-count" },
            { id: 'B', text: "grid-template-columns" },
            { id: 'C', text: "column-gap" },
            { id: 'D', text: "grid-layout-columns" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "What does the 'fr' unit represent in CSS Grid?",
        options: [
            { id: 'A', text: "Fixed Resolution" },
            { id: 'B', text: "Font Ratio" },
            { id: 'C', text: "Fractional unit (a fraction of the available space)" },
            { id: 'D', text: "Frame Rate" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which property is a shorthand for setting both row and column spacing between grid items?",
        options: [
            { id: 'A', text: "margin" },
            { id: 'B', text: "grid-spacing" },
            { id: 'C', text: "gap" },
            { id: 'D', text: "padding" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "In the rule 'grid-column: 1 / 3;', what do the numbers represent?",
        options: [
            { id: 'A', text: "The item spans from column line 1 to column line 3" },
            { id: 'B', text: "The item is 1 pixel wide and 3 pixels tall" },
            { id: 'C', text: "The item is placed in row 1, column 3" },
            { id: 'D', text: "The item repeats 1 to 3 times" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "Which property allows you to name a grid item for use in a template layout?",
        options: [
            { id: 'A', text: "grid-name" },
            { id: 'B', text: "grid-id" },
            { id: 'C', text: "grid-area" },
            { id: 'D', text: "grid-label" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 7,
        question: "Which value for 'justify-items' or 'align-items' is the default, making items fill the entire grid area?",
        options: [
            { id: 'A', text: "center" },
            { id: 'B', text: "start" },
            { id: 'C', text: "stretch" },
            { id: 'D', text: "end" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Combinators',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which combinator selects all descendants of a specified element, including children, grandchildren, and beyond?",
        options: [
            { id: 'A', text: "Child Selector (>)" },
            { id: 'B', text: "Descendant Selector (space)" },
            { id: 'C', text: "Adjacent Sibling Selector (+)" },
            { id: 'D', text: "General Sibling Selector (~)" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What is the main difference between the Descendant Selector (space) and the Child Selector (>)?",
        options: [
            { id: 'A', text: "There is no difference" },
            { id: 'B', text: "The descendant selector only targets the first child" },
            { id: 'C', text: "The child selector only targets direct children, while the descendant selector targets all levels of nesting" },
            { id: 'D', text: "The child selector targets siblings, not children" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "In the rule 'h3 + p { color: blue; }', which paragraph will be affected?",
        options: [
            { id: 'A', text: "All paragraphs inside the h3" },
            { id: 'B', text: "Every paragraph on the entire page" },
            { id: 'C', text: "Only the paragraph that comes immediately after the h3" },
            { id: 'D', text: "All paragraphs that are siblings of the h3" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which symbol is used for the General Sibling Selector, which targets all following siblings of the same parent?",
        options: [
            { id: 'A', text: "+" },
            { id: 'B', text: ">" },
            { id: 'C', text: "~" },
            { id: 'D', text: "*" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "If you want to style every <p> tag that follows an <h1> within the same container, regardless of whether they are immediately adjacent, which combinator is best?",
        options: [
            { id: 'A', text: "h1 p" },
            { id: 'B', text: "h1 > p" },
            { id: 'C', text: "h1 + p" },
            { id: 'D', text: "h1 ~ p" }
        ],
        correctAnswer: 'D',
    }
        ],
    },
    {
        topic: 'Pseudo Classes',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "What is the primary purpose of a pseudo-class in CSS?",
        options: [
            { id: 'A', text: "To create new HTML elements" },
            { id: 'B', text: "To define a special state of an element (like hover or focus)" },
            { id: 'C', text: "To link external JavaScript files" },
            { id: 'D', text: "To calculate math equations in CSS" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which pseudo-class applies when a user clicks into an <input> field and it becomes ready for typing?",
        options: [
            { id: 'A', text: ":hover" },
            { id: 'B', text: ":active" },
            { id: 'C', text: ":focus" },
            { id: 'D', text: ":visited" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "To style every second list item (<li>) in a group, which structural pseudo-class should you use?",
        options: [
            { id: 'A', text: "li:first-child" },
            { id: 'B', text: "li:last-child" },
            { id: 'C', text: "li:nth-child(2)" },
            { id: 'D', text: "li:second-child" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "How do you correctly write the syntax for a pseudo-class?",
        options: [
            { id: 'A', text: "selector :pseudo-class (with a space)" },
            { id: 'B', text: "selector:pseudo-class (no space)" },
            { id: 'C', text: "selector.pseudo-class" },
            { id: 'D', text: "selector#pseudo-class" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "Which pseudo-class is specifically used for radio or checkbox inputs that are currently selected?",
        options: [
            { id: 'A', text: ":active" },
            { id: 'B', text: ":checked" },
            { id: 'C', text: ":enabled" },
            { id: 'D', text: ":required" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "Which pseudo-class targets an element that is referred to in the URL's hash (e.g., website.com/#section1)?",
        options: [
            { id: 'A', text: ":link" },
            { id: 'B', text: ":target" },
            { id: 'C', text: ":active" },
            { id: 'D', text: ":focus" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Pseudo Elements',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "What is the primary difference between a pseudo-class and a pseudo-element in CSS syntax?",
        options: [
            { id: 'A', text: "Pseudo-classes use a dot (.), while pseudo-elements use a hash (#)" },
            { id: 'B', text: "Pseudo-classes generally use a single colon (:), while pseudo-elements use a double colon (::)" },
            { id: 'C', text: "Pseudo-elements only work with images" },
            { id: 'D', text: "There is no difference in syntax" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which pseudo-element is commonly used to create a 'drop cap' effect by styling only the first character of a paragraph?",
        options: [
            { id: 'A', text: "::first-line" },
            { id: 'B', text: "::marker" },
            { id: 'C', text: "::first-letter" },
            { id: 'D', text: "::before" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "When using the ::before or ::after pseudo-elements, which property MUST be included for the element to appear?",
        options: [
            { id: 'A', text: "display" },
            { id: 'B', text: "content" },
            { id: 'C', text: "position" },
            { id: 'D', text: "visibility" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 4,
        question: "Which pseudo-element allows you to change the background color of text specifically when a user highlights it with their cursor?",
        options: [
            { id: 'A', text: "::highlight" },
            { id: 'B', text: "::selection" },
            { id: 'C', text: "::active" },
            { id: 'D', text: "::focus" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "If you want to change the color of the bullets in an unordered list, which pseudo-element should you target?",
        options: [
            { id: 'A', text: "li::before" },
            { id: 'B', text: "li::bullet" },
            { id: 'C', text: "li::marker" },
            { id: 'D', text: "li::first-letter" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 6,
        question: "Which statement about the ::first-line pseudo-element is true?",
        options: [
            { id: 'A', text: "It styles the first sentence of a paragraph regardless of its length." },
            { id: 'B', text: "It only applies to the first line of text as it appears in the browser's current view." },
            { id: 'C', text: "It makes the entire paragraph bold." },
            { id: 'D', text: "It only works on <h1> tags." }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Attributes Selectors',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which attribute selector targets an element that has a specific attribute, regardless of what its actual value is?",
        options: [
            { id: 'A', text: "[attribute='value']" },
            { id: 'B', text: "[attribute]" },
            { id: 'C', text: "[attribute*='value']" },
            { id: 'D', text: "[attribute^='value']" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What is the purpose of the [attribute^='value'] selector?",
        options: [
            { id: 'A', text: "It selects elements whose attribute value ends with a specific string." },
            { id: 'B', text: "It selects elements whose attribute value contains a specific substring anywhere." },
            { id: 'C', text: "It selects elements whose attribute value starts with a specific string." },
            { id: 'D', text: "It selects elements with a space-separated list of values." }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "Which selector would you use to style all links that point to a secure 'https' website?",
        options: [
            { id: 'A', text: "a[href$='https']" },
            { id: 'B', text: "a[href*='https']" },
            { id: 'C', text: "a[href^='https']" },
            { id: 'D', text: "a[href|='https']" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "To apply a specific style to all images with a '.png' file extension, which selector is correct?",
        options: [
            { id: 'A', text: "img[src$='.png']" },
            { id: 'B', text: "img[src^='.png']" },
            { id: 'C', text: "img[src~='.png']" },
            { id: 'D', text: "img[src='.png']" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 5,
        question: "What does the [attribute*='value'] selector do?",
        options: [
            { id: 'A', text: "Matches the value exactly or starts with it followed by a hyphen." },
            { id: 'B', text: "Matches any element whose attribute value contains the given string anywhere inside it." },
            { id: 'C', text: "Matches only the first occurrence of the attribute." },
            { id: 'D', text: "Matches elements with no value assigned to the attribute." }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "Which selector is best for targeting a language code like 'en' or 'en-US'?",
        options: [
            { id: 'A', text: "[lang~='en']" },
            { id: 'B', text: "[lang^='en']" },
            { id: 'C', text: "[lang|='en']" },
            { id: 'D', text: "[lang$='en']" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Box Shadow',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which two values are strictly required for the box-shadow property to function?",
        options: [
            { id: 'A', text: "blur and spread" },
            { id: 'B', text: "h-offset and v-offset" },
            { id: 'C', text: "color and inset" },
            { id: 'D', text: "h-offset and blur" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What happens if you provide a negative value for the horizontal offset (h-offset)?",
        options: [
            { id: 'A', text: "The shadow moves to the right of the element" },
            { id: 'B', text: "The shadow moves to the left of the element" },
            { id: 'C', text: "The shadow becomes an inner shadow" },
            { id: 'D', text: "The shadow disappears" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which property value controls how 'blurry' or soft the edges of the shadow appear?",
        options: [
            { id: 'A', text: "spread" },
            { id: 'B', text: "v-offset" },
            { id: 'C', text: "blur" },
            { id: 'D', text: "inset" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "How do you change a shadow from an outer shadow to an inner shadow?",
        options: [
            { id: 'A', text: "Use a negative spread value" },
            { id: 'B', text: "Set the color to transparent" },
            { id: 'C', text: "Add the 'inset' keyword to the declaration" },
            { id: 'D', text: "Set both offsets to 0" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "What does the 'spread' value do in a box-shadow declaration?",
        options: [
            { id: 'A', text: "It changes the color of the shadow" },
            { id: 'B', text: "It determines the transparency of the shadow" },
            { id: 'C', text: "It expands or shrinks the size of the shadow beyond the blur radius" },
            { id: 'D', text: "It moves the shadow vertically" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 6,
        question: "Is it possible to apply more than one shadow to a single HTML element?",
        options: [
            { id: 'A', text: "No, only one shadow is allowed per element" },
            { id: 'B', text: "Yes, by separating multiple shadow declarations with commas" },
            { id: 'C', text: "Yes, but only if one is an inset shadow" },
            { id: 'D', text: "No, you must use a different element for each shadow" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Opacity',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which range of values is used for the CSS opacity property?",
        options: [
            { id: 'A', text: "0 to 100" },
            { id: 'B', text: "0.0 to 1.0" },
            { id: 'C', text: "1 to 10" },
            { id: 'D', text: "-1 to 1" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "What happens to an element when its opacity is set to 0?",
        options: [
            { id: 'A', text: "It is removed from the document layout." },
            { id: 'B', text: "It becomes fully visible." },
            { id: 'C', text: "It becomes completely invisible but still occupies its space in the layout." },
            { id: 'D', text: "Its background color changes to white." }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "If you want an element to be exactly halfway transparent, which value should you use?",
        options: [
            { id: 'A', text: "opacity: 5;" },
            { id: 'B', text: "opacity: 50;" },
            { id: 'C', text: "opacity: 0.5;" },
            { id: 'D', text: "opacity: 0.05;" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which of the following statements about 'opacity' is true?",
        options: [
            { id: 'A', text: "It only affects the background color of an element." },
            { id: 'B', text: "It affects the entire element, including its text and child elements." },
            { id: 'C', text: "It only works on <img> tags." },
            { id: 'D', text: "It makes elements disappear from the DOM." }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "If you want to make *only* the background of a div transparent while keeping the text fully opaque, what should you use instead of the opacity property?",
        options: [
            { id: 'A', text: "opacity: 0.5;" },
            { id: 'B', text: "rgba() or hsla() color values" },
            { id: 'C', text: "visibility: hidden;" },
            { id: 'D', text: "display: none;" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "What is the default opacity value for every HTML element?",
        options: [
            { id: 'A', text: "0" },
            { id: 'B', text: "0.5" },
            { id: 'C', text: "1" },
            { id: 'D', text: "auto" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Transform',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which CSS property allows you to rotate, scale, and move elements without affecting the document flow?",
        options: [
            { id: 'A', text: "transition" },
            { id: 'B', text: "transform" },
            { id: 'C', text: "position" },
            { id: 'D', text: "animation" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "In the function 'transform: translate(50px, 100px);', what do the two values represent?",
        options: [
            { id: 'A', text: "Rotate 50 degrees and scale by 100" },
            { id: 'B', text: "Move 50px horizontally (X) and 100px vertically (Y)" },
            { id: 'C', text: "Increase width by 50px and height by 100px" },
            { id: 'D', text: "Skew the element by 50px and 100px" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 3,
        question: "Which value for 'scale()' would make an element appear twice as large as its original size?",
        options: [
            { id: 'A', text: "scale(0.5)" },
            { id: 'B', text: "scale(1)" },
            { id: 'C', text: "scale(2)" },
            { id: 'D', text: "scale(200)" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "What unit is typically used with the 'rotate()' function?",
        options: [
            { id: 'A', text: "px (pixels)" },
            { id: 'B', text: "deg (degrees)" },
            { id: 'C', text: "% (percentage)" },
            { id: 'D', text: "rem (root em)" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 5,
        question: "Which function would you use to 'tilt' an element along the X or Y axis, making it look slanted?",
        options: [
            { id: 'A', text: "skew()" },
            { id: 'B', text: "matrix()" },
            { id: 'C', text: "translate()" },
            { id: 'D', text: "rotate()" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "Does the order of functions matter when applying multiple transforms (e.g., 'rotate(45deg) translate(100px)')?",
        options: [
            { id: 'A', text: "No, the browser applies them all at once regardless of order." },
            { id: 'B', text: "Yes, transforms are applied in the sequence they are written." },
            { id: 'C', text: "Only if you are using 'scale()'." },
            { id: 'D', text: "Order only matters in Internet Explorer." }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: 'Transition',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "What is the primary purpose of CSS transitions?",
        options: [
            { id: 'A', text: "To create complex 3D models" },
            { id: 'B', text: "To change property values smoothly over a specific duration instead of instantly" },
            { id: 'C', text: "To link HTML pages together" },
            { id: 'D', text: "To validate form inputs" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which property defines how long a transition should take to complete (e.g., 2s or 500ms)?",
        options: [
            { id: 'A', text: "transition-property" },
            { id: 'B', text: "transition-delay" },
            { id: 'C', text: "transition-duration" },
            { id: 'D', text: "transition-timing" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "In the shorthand 'transition: opacity 0.5s ease-in 1s;', what does the '1s' value at the end represent?",
        options: [
            { id: 'A', text: "The duration of the transition" },
            { id: 'B', text: "The number of times it repeats" },
            { id: 'C', text: "The delay before the transition begins" },
            { id: 'D', text: "The speed of the animation" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which timing function makes a transition start slowly, speed up in the middle, and then end slowly?",
        options: [
            { id: 'A', text: "linear" },
            { id: 'B', text: "ease-in" },
            { id: 'C', text: "ease-out" },
            { id: 'D', text: "ease-in-out" }
        ],
        correctAnswer: 'D',
    },
    {
        id: 5,
        question: "Which keyword can you use in 'transition-property' to apply a transition to every animatable property that changes?",
        options: [
            { id: 'A', text: "any" },
            { id: 'B', text: "all" },
            { id: 'C', text: "everything" },
            { id: 'D', text: "none" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "What is required for a transition to actually occur?",
        options: [
            { id: 'A', text: "A change in a property value, usually triggered by an interaction like :hover" },
            { id: 'B', text: "The use of a <div> tag" },
            { id: 'C', text: "A background image" },
            { id: 'D', text: "The position: fixed property" }
        ],
        correctAnswer: 'A',
    }
        ],
    },
    {
        topic: 'Animations',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "Which CSS rule is used to define the actual steps and styles of an animation sequence?",
        options: [
            { id: 'A', text: "@animation-steps" },
            { id: 'B', text: "@keyframes" },
            { id: 'C', text: "@frames" },
            { id: 'D', text: "@animate" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which property is used to bind an element to a specific @keyframes rule?",
        options: [
            { id: 'A', text: "animation-link" },
            { id: 'B', text: "animation-id" },
            { id: 'C', text: "animation-name" },
            { id: 'D', text: "animation-source" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "If you want an animation to play forever without stopping, what value should you use for 'animation-iteration-count'?",
        options: [
            { id: 'A', text: "loop" },
            { id: 'B', text: "always" },
            { id: 'C', text: "infinite" },
            { id: 'D', text: "0" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "Which property value ensures that an element stays at its final animation state (the 'to' or '100%' styles) after the animation finishes?",
        options: [
            { id: 'A', text: "animation-fill-mode: forwards;" },
            { id: 'B', text: "animation-direction: alternate;" },
            { id: 'C', text: "animation-play-state: paused;" },
            { id: 'D', text: "animation-fill-mode: backwards;" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 5,
        question: "What does 'animation-direction: alternate;' do?",
        options: [
            { id: 'A', text: "It plays the animation upside down" },
            { id: 'B', text: "It plays the animation forward, then backward, in repeating cycles" },
            { id: 'C', text: "It skips every other frame" },
            { id: 'D', text: "It changes the color of the animation randomly" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 6,
        question: "In a @keyframes rule, which keywords can be used as shorthand for 0% and 100%?",
        options: [
            { id: 'A', text: "start and finish" },
            { id: 'B', text: "first and last" },
            { id: 'C', text: "from and to" },
            { id: 'D', text: "alpha and omega" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 7,
        question: "Which property allows you to pause an animation, perhaps via a hover effect or JavaScript?",
        options: [
            { id: 'A', text: "animation-stop" },
            { id: 'B', text: "animation-wait" },
            { id: 'C', text: "animation-play-state" },
            { id: 'D', text: "animation-freeze" }
        ],
        correctAnswer: 'C',
    }
        ],
    },
    {
        topic: 'Media Query',
        category: 'css2',
        questions: [
            {
        id: 1,
        question: "What is the primary purpose of using media queries in CSS?",
        options: [
            { id: 'A', text: "To play videos and audio files on a webpage" },
            { id: 'B', text: "To apply different styles based on device characteristics like screen width" },
            { id: 'C', text: "To connect the website to social media platforms" },
            { id: 'D', text: "To speed up the website's loading time" }
        ],
        correctAnswer: 'B',
    },
    {
        id: 2,
        question: "Which CSS at-rule is used to start a media query?",
        options: [
            { id: 'A', text: "@screen" },
            { id: 'B', text: "@responsive" },
            { id: 'C', text: "@media" },
            { id: 'D', text: "@device" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 3,
        question: "What does the condition '(max-width: 600px)' target?",
        options: [
            { id: 'A', text: "Screens that are exactly 600px wide" },
            { id: 'B', text: "Screens that are 600px or wider" },
            { id: 'C', text: "Screens that are 600px or narrower" },
            { id: 'D', text: "Only printed documents" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 4,
        question: "If you want a layout to change only when a tablet is rotated sideways, which media feature should you use?",
        options: [
            { id: 'A', text: "resolution" },
            { id: 'B', text: "aspect-ratio" },
            { id: 'C', text: "orientation" },
            { id: 'D', text: "min-device-pixel-ratio" }
        ],
        correctAnswer: 'C',
    },
    {
        id: 5,
        question: "Which of the following is the correct syntax for a media query that targets screens with a minimum width of 768px?",
        options: [
            { id: 'A', text: "@media (min-width: 768px) { ... }" },
            { id: 'B', text: "@media screen and 768px { ... }" },
            { id: 'C', text: "if screen > 768px { ... }" },
            { id: 'D', text: "@responsive 768px { ... }" }
        ],
        correctAnswer: 'A',
    },
    {
        id: 6,
        question: "In responsive design, what is a 'breakpoint'?",
        options: [
            { id: 'A', text: "A point where the website code stops working" },
            { id: 'B', text: "The specific screen width where the layout changes via a media query" },
            { id: 'C', text: "The time it takes for an image to load" },
            { id: 'D', text: "A error in the CSS file" }
        ],
        correctAnswer: 'B',
    }
        ],
    },
    {
        topic: '',
        category: 'css2',
        questions: [
            
        ],
    },
];

    

