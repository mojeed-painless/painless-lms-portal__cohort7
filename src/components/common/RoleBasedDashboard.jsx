import { useAuth } from '../../context/AuthContext';
import DashboardScreen from '../../pages/DashboardScreen';
import AdminDashboardScreen from '../../pages/AdminDashboardScreen';

const RoleBasedDashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Redirecting...</div>; 
  }

  if (user.role === 'admin') {
    return <AdminDashboardScreen />;
  }

  return <DashboardScreen />;
};

export default RoleBasedDashboard;