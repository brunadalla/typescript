import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Login';

const RoutesMain = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/dashboard' element={<Dashboard />} />
  </Routes>
);

export default RoutesMain;
