import '../../assets/styles/construction.css';
import { FaLaptopCode } from 'react-icons/fa';

export default function UnderDevelopment({ section }) {
  return (
    <div className="under-development">
      <span>
        <FaLaptopCode />
      </span>
      <p>🚧 Under Development 🚧</p>
      <small>The {section} section is coming soon</small>
    </div>
  );
}
