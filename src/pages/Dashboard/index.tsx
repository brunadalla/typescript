import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user ? <h1>Dashboard</h1> : <Navigate to='/' replace />;
};

export default Dashboard;
