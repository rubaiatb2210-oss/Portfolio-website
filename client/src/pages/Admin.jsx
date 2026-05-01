import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminLayout from '../components/admin/AdminLayout';

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/" replace />;

  return <AdminLayout />;
};

export default Admin;
