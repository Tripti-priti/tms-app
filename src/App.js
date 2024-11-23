import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/dashboard/Dashboard';
import NoPage from './components/shared/NoPage';
import UserDetail from './components/userSetup/UserDetail';
import UserList from './components/userSetup/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/userdetail" element={<UserDetail />} />
          <Route path="/userdetail/:id" element={<UserDetail />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
