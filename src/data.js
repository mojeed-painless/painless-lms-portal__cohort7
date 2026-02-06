import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook, MdOutlineAssignment } from "react-icons/md";
import { LuSparkles, LuBrainCircuit, LuCrown } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaDoorOpen, FaCode, FaPaintbrush, FaRegFileLines } from "react-icons/fa6";
import { FiPenTool } from "react-icons/fi";
import {
    Award,
    BadgeCheck,
    NotepadText,
    Sparkles,
    Atom,
    PenTool,
    CodeXml,
    UsersRound,
    UserRoundCheck,
    History,
    BookOpenText,
    Trophy,
    FileBadge,
    BrainCircuit,
} from 'lucide-react';

// SIDEBAR DATA
export const listTexts = [
  { id: 1, text: 'Home', icon: FiHome, to: '/' },
  { id: 2, text: 'Course Contents', icon: MdOutlineMenuBook, to: '/welcome' },
  { id: 3, text: 'Assignments', icon: MdOutlineAssignment, to: '/assignments' },
  { id: 4, text: 'Quizzes', icon: LuSparkles, to: '/quizzes' },
  { id: 5, text: 'Leaderboard', icon: LuCrown, to: '/leaderboard' },
  { id: 6, text: 'Transcript', icon: FaRegFileLines, to: '/transcript' },
  { id: 7, text: 'Settings', icon: IoSettingsOutline, to: '/settings' },
]

export const homeFeatures = [
    {
        Icon: CodeXml,
        title: 'Interactive Learning',
        description: 'Practice with real-world scenarios and get instant feedback.',
    },
    {
        Icon: Trophy,
        title: 'Gamified Progress',
        description: 'Compete with others to earn points, badges, and climb the leaderboard.',
    },
    {
        Icon: FileBadge,
        title: 'Certification',
        description: 'Earn certificate as a proof of participation and competent',
    },
]

export const homeStats = [
    {
        figure: '100+',
        label: 'Certified Learners',
    },
    {
        figure: '70+',
        label: 'Learning Contents',
    },  
    {
        figure: '50+',
        label: 'Quizzes Taken',
    },
    {
        figure: '4.9',
        label: 'Average Rating',
    },
]



export const homeTestimonials = [
    {
        name: 'Ibrahim Adekunle',
        feedback: 'Although I had heard that I can code using my smart phone but I never imagined It could be this simple for a newbie. Everything was well organized right from the awareness to the course itself. One thing is to know what to teach others, another thing is to know how to teach them well, as in PAINLESS IS FULLY LOADED, he delivered to us a PRICELESS value.',
        rating: 5,
    },
    {
        name: 'Awofeso Damilare',
        feedback: "The training was indeed one of a kind and I'm glad to be a part of it. I have been able to learn so much within a short time. You make coding so simple to learn. The live classes were also on point as you constantly dished out knowledge.",
        rating: 4.9,
    },
    {
        name: 'Triple Ade',
        feedback: "My gratitude goes to the founder of Painless CODE Academy for the great knowledge he passed on to us. I am saying this confidently to people's outside their who intends to learn about CODING, with Painless Code Academy you gat nothing to worried about. It was so fun and interactive throughout of the course.",
        rating: 5,
    },
    {
        name: 'Ahmad',
        feedback: 'After I attended the first two classes I realized I would have had a great loss if I had missed that opportunity, I learnt new things that I can boldly say I can code... EVERYTHING WAS MADE EASY!',
        rating: 4.8,
    },
];


// WELCOME SCREEN DATA
export const topics = [
    {
        id: 1,
        icon: FaDoorOpen,
        section: "INTRODUCTION",
        description: "Learn the basics of web structure",
        subjects: [
            {name: 'General Overview', path: '/general-overview'},
            {name: 'Why should I learn Coding', path: '/why'},
            {name: 'Course Overview', path: '/course-overview'},
            {name: 'Code Editors', path: '/editor'},
            {name: 'Assignment Guide', path: '/assignment-guide'},
        ]
    },
    {
        id: 2,
        icon: FaCode,
        section: "HTML",
        description: "Understand the building blocks of every webpage.",
        subjects: [
            // {name: 'HTML Page Structure', path: '/html-structure'},
            // {name: 'Lists', path: '/html-list'},
            // {name: 'Tables', path: '/html-table'},
            // {name: 'Images', path: '/html-image'},
            // {name: 'Hyperlinks', path: '/html-hyperlinks'},
            // {name: 'Inline & Block Elements', path: '/html-block-element'},
            // {name: 'Forms, Types & Fields', path: '/html-form'},
            // {name: 'HTML Styling', path: '/html-style'}
        ]
    },
    {
        id: 3,
        icon: FaPaintbrush,
        section: "CSS Basics",
        description: "Discover how to transform plain structures into visually appealing designs.",
        subjects: [
            // {name: 'Introduction to CSS', path: '/css_introduction'},
            // {name: 'Inserting CSS', path: '/css_insert'},
            // {name: 'CSS Syntax', path: '/css_syntax'},
            // {name: 'Selectors', path: '/css_selectors'},
            // {name: 'Colors', path: '/css_color'},
            // {name: 'Background', path: '/css_background'},
            // {name: 'Borders', path: '/css_border'},
            // {name: 'Box Model', path: '/css_boxmodel'},
            // {name: 'Height & Width', path: '/css_width'},
            // {name: 'Text Formatting', path: '/css_formatting'},
            // {name: 'Links', path: '/css_links'},
            // {name: 'Lists', path: '/css_lists'},
            // {name: 'Tables', path: '/css_table'},
            // {name: 'Icons', path: '/css_icon'},
        ]
    },
        {
        id: 4,
        icon: FiPenTool,
        section: "CSS Layouts",
        description: "Discover how to transform plain structures into visually appealing designs.",
        subjects: [
            // {name: 'Layout: Display', path: '/css_display'},
            // {name: 'Layout: Overflow', path: '/css_overflow'},
            // {name: 'Layout: Position', path: '/css_position'},
            // {name: 'Layout: Flex Box', path: '/css_flexbox'},
            // {name: 'Layout: Grid', path: '/css_grid'},
            // {name: 'Combinators', path: '/css_conbinator'},
            // {name: 'Pseudo-classes', path: '/css_pseudoclass'},
            // {name: 'Pseudo-elements', path: '/css_pseudoelement'},
            // {name: 'Attributes Selector', path: '/css_attribute'},
            // {name: 'Box Shadow', path: '/css_boxshadow'},
            // {name: 'Opacity', path: '/css_opacity'},
            // {name: 'Transform', path: '/css_transform'},
            // {name: 'Transition', path: '/css_transition'},
            // {name: 'Animations', path: '/css_animation'},
            // {name: 'Media Query', path: '/css_mediaquery'},
            // {name: 'Styling Forms', path: '/css_form'},
            // {name: 'Navigation Bar', path: '/css_navbar'},
            // {name: 'Portfolio Project', path: '/css_portfolio'}
        ]
    },
    {
        id: 5,
        icon: LuBrainCircuit,
        section: "Javascript",
        description: "Make your websites interactive and dynamic.",
        subjects: [
            // {name: 'JavaScript Introduction', path: '/js-intro'},
            // {name: 'Linking Javascript', path: '/js-linking'},
            // {name: 'Alert, Console & Comment', path: '/js-alert'},
            // {name: 'Statements', path: '/js-statements'},
            // {name: 'Variables', path: '/js-variables'},
            // {name: 'Naming Variables', path: '/js-naming-variables'},
            // {name: 'Constant', path: '/js-constant'},
            // {name: 'Data Types', path: '/js-data-types'},
            // {name: 'Strings', path: '/js-strings'},
            // {name: 'Numbers', path: '/js-numbers'},
            // {name: 'BigInt', path: '/js-bigInt'},
            // {name: 'Boolean', path: '/js-boolean'},
            // {name: 'Null & Undefined', path: '/js-null'},
            // {name: 'TypeOf', path: '/js-typeOf'},
            // {name: 'BrowserUserInteraction', path: '/js-browser-user-interaction'},
            // {name: 'StringConversion', path: '/js-string-conversion'},
            // {name: 'NumberConversion', path: '/js-number-conversion'},
            // {name: 'BooleanConversion', path: '/js-boolean-conversion'},
        ]
    },
]






// DASHBOARD STATS
export const statsData = [
    {
        title: 'Lessons Completed',
        figure: '0/74',
        description: '0% completed',
        Icon: BadgeCheck,
    },
    {
        title: 'Overall Grade',
        figure: '0%',
        description: 'Keep learning!',
        Icon: Award,
    },
    {
        title: 'Assignments Done',
        figure: '5',
        description: 'submit (2) pending Assignment',
        Icon: NotepadText,
    },
    {
        title: 'Daily Quiz',
        figure: '0 pts',
        description: '+0 pts today',
        Icon: Sparkles,
    },
]




export const learningPath = [
    {
        Icon: CodeXml,
        stage: 'Beginner',
        title: 'HTML, CSS & Basic JavaScript',
        description: 'Master the foundational technologies of web development',
        module: '0/5 modules complete',
        link: '/welcome',
    },
    {
        Icon: BrainCircuit,
        stage: 'Intermediate',
        title: 'Advanced JavaScript',
        description: 'Deep dive into modern JavaScript concepts',
        module: '0/4 modules complete',
        link: '',
    },
    {
        Icon: Atom,
        stage: 'Advanced',
        title: 'React Mastery',
        description: 'Build modern web applications with React',
        module: '0/8 modules complete',
        link: '',
    }
]





export const adminStats = [
    {
        title: 'Total Users',
        value: '1,234',
        Icon: UsersRound,
        color: 'blue',
    },
    {
        title: 'Pending Approval',
        value: '56',
        Icon: History,
        color: 'yellow',
    },
    {
        title: 'Approved Users',
        value: '890',
        Icon: UserRoundCheck,
        color: 'green',
    },
    {
        title: 'Course Enrollments',
        value: '12',
        Icon: BookOpenText,
        color: 'purple',
    }
]