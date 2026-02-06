import { Link } from 'react-router-dom';
import {
  MoveRight,
} from 'lucide-react';

export default function AssignmentBox({ children, title }) {
    return (
        <>
            <hr />
            <div className="exercise">
                
                <h3>Assignment: ({title})</h3>

                <p>Instructions:</p>

                {children}

                <Link to="/assignments" className="assignment-btn">
                    Click to Submit Assignment
                    <span><MoveRight/></span>
                </Link>    
            </div>
            <hr />
        </>
    )
}