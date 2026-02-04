import React, { useState, useEffect } from 'react';
import '../../assets/styles/testimonial-card.css';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import profileImage from '../../assets/profile-image.jpg'

const TestimonialCard = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-slide effect
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false); // Pause auto-play when user clicks
    setTimeout(() => setAutoPlay(true), 8000); // Resume after 8 seconds
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-card-wrapper">
        {/* Main Card */}
        <div className="testimonial-card">
          <div className="testimonial-card-content">
            {/* Stars */}
            <div className="testimonial-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(current.rating) ? 'filled' : 'empty'}
                  fill={i < Math.floor(current.rating) ? '#ffd700' : 'none'}
                  color={i < Math.floor(current.rating) ? '#ffd700' : '#666'}
                />
              ))}
            </div>

            {/* Feedback Text */}
            <p className="testimonial-feedback">{current.feedback}</p>

            {/* Author Info */}
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src={profileImage} alt={current.name} />
              </div>

              <div className="author-info">
                <h4>{current.name}</h4>
                <p className="rating-text">{current.rating} out of 5</p>
              </div>
            </div>
          </div>

          {/* Gradient Border */}
          <div className="card-glow"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="testimonial-nav">
        <button
          className="navs-btn prev-btn"
          onClick={goToPrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="navs-btn prev-btn"
          onClick={goToNext}
          aria-label="Previous testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
