import { useNavigate } from 'react-router-dom'; 
import thumbnail from '../../assets/portfolio1.jpg';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Temporary hardcoded values for progress until we implement the Progress API
  const progressPercentage = 60; // Example
  const actionText = progressPercentage > 0 ? 'Continue Course' : 'Start Learning';

  const handleActionClick = () => {
    // Navigate to the course details/player page
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="card-container">
      
      {/* Course Image */}
      <div className="card-image-wrapper">
        <img
          src={course.thumbnailUrl || thumbnail}
          alt={`Thumbnail for ${course.title}`}
          className="card-image"
        />
      </div>

      {/* Content Area */}
      <div className="card-content">
        <div>
          {/* Title */}
          <h3 className="card-title">
            {course.title}
          </h3>
          {/* Instructor (Using instructor.username from the backend populate) */}
          <p className="card-instructor">
            By {course.instructor ? course.instructor.username : 'Unknown Instructor'}
          </p>
        </div>

        {/* Progress Bar Placeholder (for demonstration) */}
        <div className="card-progress-bar">
          <div 
            className="card-progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Action Button */}
        <button
          onClick={handleActionClick}
          className="primary-btn card-action-btn"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;