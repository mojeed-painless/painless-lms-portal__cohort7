# Painless LMS Portal

A modern, comprehensive Learning Management System (LMS) built with React and Vite, designed to provide an intuitive and seamless learning experience for students, instructors, and administrators.

![Painless Logo](./src/assets/pcalogo.png)

![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Features

### For Students
- **Interactive Course Player**: Engage with multimedia content including videos and code examples
- **Progress Tracking**: Monitor learning progress across all enrolled courses
- **Assignments & Quizzes**: Complete interactive assignments and take quizzes with instant feedback
- **Grade Management**: View grades and transcripts for completed courses
- **Personal Dashboard**: Access enrolled courses, upcoming assignments, and recent activity

### For Instructors
- **Course Management**: Create and manage course content with rich multimedia support
- **Student Oversight**: Monitor student progress and performance
- **Assignment Grading**: Review and grade student submissions
- **Analytics Dashboard**: Gain insights into course engagement and student success

### For Administrators
- **User Management**: Oversee all users, roles, and permissions
- **System Analytics**: Comprehensive reporting on platform usage and performance
- **Content Moderation**: Ensure quality and compliance of course materials
- **Platform Configuration**: Manage system settings and integrations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0 with Vite
- **Styling**: Vanilla CSS and Tailwind CSS 4.1.17
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Code Highlighting**: Prism.js 1.30.0
- **Icons**: React Icons 5.5.0
- **Build Tool**: Vite 7.2.4
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mojeed-painless/painless-lms-portal.git
   cd painless-lms-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
painless-lms-portal/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── styles/         # CSS stylesheets
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   └── courses/        # Course-specific components
│   ├── context/            # React context providers
│   ├── pages/              # Main application pages
│   │   ├── css-pages/      # CSS learning modules
│   │   ├── html-pages/     # HTML learning modules
│   │   └── js-pages/       # JavaScript learning modules
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── data.js             # Static data and configurations
├── package.json
├── vite.config.js
├── eslint.config.js
└── vercel.json
```

## 🎯 Key Components

### Authentication System
- Secure login/logout functionality
- Role-based access control (Student, Instructor, Admin)
- Protected routes and private components

### Course Management
- **Course Catalog**: Browse and enroll in available courses
- **Course Player**: Interactive learning interface with video support
- **Progress Tracking**: Visual progress indicators and completion tracking

### Learning Modules
- **HTML Fundamentals**: Comprehensive HTML learning path
- **CSS Mastery**: Advanced styling techniques and responsive design
- **JavaScript Essentials**: Interactive programming lessons

### Assessment Tools
- **Quizzes**: Multiple-choice and interactive assessments
- **Assignments**: Code submission and project-based tasks
- **Grading System**: Automated and manual grading capabilities

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌐 Deployment

This application is configured for deployment on Vercel with the following setup:

- Single Page Application (SPA) routing handled by `vercel.json`
- Automatic builds on push to main branch
- Optimized production builds with Vite

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

<!-- ## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Code highlighting powered by [Prism.js](https://prismjs.com/)

## 📞 Support

For support, email [shittumjd00@gmail.com] or message on [Whatsapp](https://wa.me/2349124323167).

---

**Happy Learning! 🎓**
