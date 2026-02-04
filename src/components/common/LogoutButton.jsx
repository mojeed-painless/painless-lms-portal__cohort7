import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/logoutBtn.css'; 
import { TbLogout2 } from "react-icons/tb";

const LogoutButton = ( { className, isCollapsed } ) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={`logout-btn ${className}`}>
      <span><TbLogout2 /></span>
      {!isCollapsed && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;