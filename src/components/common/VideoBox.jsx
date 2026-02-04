import '../../assets/styles/video-box.css';

export default function VideoBox({ title, code }) {
    return (
        <div className="watch">
            <p>🎥 Watch: {title}</p>
            <div className="video-responsive">
                <iframe width="100%" height="100%" 
                    src={`https://www.youtube.com/embed/${code}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}